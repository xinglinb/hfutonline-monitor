const moment = require('moment');
const performanceModel = require('../models/performance');

module.exports = {
  async getPerformanceStatData(pid) {
    try {
      const toDayStatData = await performanceModel.getPerformanceStatData(pid, moment().format('YYYY-MM-DD'));
      const weekStatData = await performanceModel.getPerformanceStatData(pid, moment().format('YYYY/WW'));
      const monthStatData = await performanceModel.getPerformanceStatData(pid, moment().format('YYYY-MM'));
      const yearStatData = await performanceModel.getPerformanceStatData(pid, moment().format('YYYY'));
      const allStatData = await performanceModel.getPerformanceStatData(pid, 'all');
      return {
        toDayStatData,
        weekStatData,
        monthStatData,
        yearStatData,
        allStatData,
      };
    } catch (e) {
      return e;
    }
  },

  async getSevenAvgAllTime(pid) {
    try {
      const oneStatData = await performanceModel.getSevenAvgAllTime(pid, moment().subtract(6, 'days').format('YYYY-MM-DD'));
      const twoStatData = await performanceModel.getSevenAvgAllTime(pid, moment().subtract(5, 'days').format('YYYY-MM-DD'));
      const threeStatData = await performanceModel.getSevenAvgAllTime(pid, moment().subtract(4, 'days').format('YYYY-MM-DD'));
      const fourStatData = await performanceModel.getSevenAvgAllTime(pid, moment().subtract(3, 'days').format('YYYY-MM-DD'));
      const fiveStatData = await performanceModel.getSevenAvgAllTime(pid, moment().subtract(2, 'days').format('YYYY-MM-DD'));
      const sixStatData = await performanceModel.getSevenAvgAllTime(pid, moment().subtract(1, 'days').format('YYYY-MM-DD'));
      const sevenStatData = await performanceModel.getSevenAvgAllTime(pid, moment().format('YYYY-MM-DD'));
      return [
        ...oneStatData,
        ...twoStatData,
        ...threeStatData,
        ...fourStatData,
        ...fiveStatData,
        ...sixStatData,
        ...sevenStatData,
      ];
    } catch (e) {
      return e;
    }
  },
};
