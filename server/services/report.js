const moment = require('moment');
const reportModel = require('../models/report');

module.exports = {
  async reportPerformanceData({ request }) {
    try {
      const { navigator, param, pid, create_time } = request.query;
      const performanceData = {
        pid,
        ...JSON.parse(navigator),
        ...JSON.parse(param),
        create_time: moment(Number(create_time)).format('YYYY-MM-DD HH:mm:ss'),
      };
      await reportModel.reportPerformanceData(performanceData);
      return performanceData;
    } catch (e) {
      return e;
    }
  },

  async reportPerformanceStatData({ request }, stat_date) {
    try {
      const { param, pid } = request.query;
      const performanceData = JSON.parse(param);
      const oldStatData = await reportModel.isPerformanceStatDataSaved(pid, stat_date);
      const newStatData = {
        pid,
        stat_date,
        tatol: 1,
        avg_unload_prePage: performanceData.unload_prePage,
        avg_dns_tcp: performanceData.dns_tcp,
        avg_res_html: performanceData.res_html,
        avg_res_js: performanceData.res_js,
        avg_parse_resources: performanceData.parse_resources,
        avg_dom_render: performanceData.dom_render,
        avg_all_time: performanceData.all_time,
      };
      if (!oldStatData.num) {
        await reportModel.insertPerformanceStatData(newStatData);
      } else {
        const { tatol } = oldStatData;
        await reportModel.updatePerformanceStatData({
          pid,
          stat_date,
          tatol: tatol + 1,
          avg_unload_prePage: (newStatData.avg_unload_prePage + oldStatData.avg_unload_prePage * tatol) / (tatol + 1),
          avg_dns_tcp: (newStatData.avg_dns_tcp + oldStatData.avg_dns_tcp * tatol) / (tatol + 1),
          avg_res_html: (newStatData.avg_res_html + oldStatData.avg_res_html * tatol) / (tatol + 1),
          avg_res_js: (newStatData.avg_res_js + oldStatData.avg_res_js * tatol) / (tatol + 1),
          avg_parse_resources: (newStatData.avg_parse_resources + oldStatData.avg_parse_resources * tatol) / (tatol + 1),
          avg_dom_render: (newStatData.avg_dom_render + oldStatData.avg_dom_render * tatol) / (tatol + 1),
          avg_all_time: (newStatData.avg_all_time + oldStatData.avg_all_time * tatol) / (tatol + 1),
        });
      }
      return {
        newStatData,
        oldStatData,
      };
    } catch (e) {
      return e;
    }
  },

  async reportErrorData({ request }) {
    try {
      const { navigator, param, pid, create_time } = request.query;
      const { mid, ...moniterParams } = JSON.parse(param);

      const moniterParamsName = await reportModel.selectMoniterParamsName(mid, pid);
      const errorData = {
        pid,
        mid,
        create_time: moment(Number(create_time)).format('YYYY-MM-DD HH:mm:ss'),
        ...JSON.parse(navigator),
        moniterParams: {
          param_one: moniterParams[moniterParamsName.param_one] || '',
          param_two: moniterParams[moniterParamsName.param_two] || '',
          param_three: moniterParams[moniterParamsName.param_three] || '',
          param_four: moniterParams[moniterParamsName.param_four] || '',
          param_five: moniterParams[moniterParamsName.param_five] || '',
        },
      };

      const res = await reportModel.reportErrorData(errorData);

      return res;
    } catch (e) {
      return e;
    }
  },

  async reportErrorStatData({ request }, { insertId }) {
    try {
      const { param, pid, create_time } = request.query;
      const { mid } = JSON.parse(param);
      const stat_date = moment(Number(create_time)).format('YYYY-MM-DD HH:mm');
      const oldStatData = await reportModel.isErrorStatDataSaved(pid, mid, stat_date);
      const newStatData = {
        pid,
        mid,
        stat_date,
        tatol: 1,
        ids: insertId,
      };
      if (!oldStatData.num) {
        await reportModel.insertErrorStatData(newStatData);
      } else {
        const { tatol, ids } = oldStatData;
        await reportModel.updateErrorStatData({
          pid,
          mid,
          stat_date,
          tatol: tatol + 1,
          ids: `${ids},${insertId}`,
        });
      }
      return {
        oldStatData,
        newStatData,
      };
    } catch (e) {
      return e;
    }
  },
};
