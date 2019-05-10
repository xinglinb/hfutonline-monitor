const moment = require('moment');
const reportService = require('../services/report');

module.exports = {

  async reportPerformanceData(ctx) {
    const { create_time } = ctx.request.query;
    const stat_date_day = moment(Number(create_time)).format('YYYY-MM-DD');
    const stat_date_week = moment(Number(create_time)).format('YYYY/WW');
    const stat_date_month = moment(Number(create_time)).format('YYYY-MM');
    const stat_date_year = moment(Number(create_time)).format('YYYY');
    reportService.reportPerformanceData(ctx);
    reportService.reportPerformanceStatData(ctx, stat_date_day);
    reportService.reportPerformanceStatData(ctx, stat_date_week);
    reportService.reportPerformanceStatData(ctx, stat_date_month);
    reportService.reportPerformanceStatData(ctx, stat_date_year);
    reportService.reportPerformanceStatData(ctx, 'all');
    ctx.body = {};
  },

  async reportErrorData(ctx) {
    const errorDataResult = await reportService.reportErrorData(ctx);
    const errorStatData = await reportService.reportErrorStatData(ctx, errorDataResult);
    ctx.body = {
      errorDataResult,
      errorStatData,
    };
  },
};
