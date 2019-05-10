// const moment = require('moment');
const performanceService = require('../services/performance');
const projectService = require('../services/project');

module.exports = {

  async getPerformanceData(ctx) {
    const { pid, uid } = ctx.request.query;
    const projectAuth = await projectService.checkProjectAuth(pid, uid);
    if (!projectAuth) {
      ctx.body = {
        code: 403,
        data: '',
        message: '没有该项目权限',
      };
      return;
    }
    const statData = await performanceService.getPerformanceStatData(pid);
    const sevenAvgAllTime = await performanceService.getSevenAvgAllTime(pid);
    ctx.body = {
      code: 200,
      data: {
        statData,
        sevenAvgAllTime,
      },
      message: '',
    };
  },

};
