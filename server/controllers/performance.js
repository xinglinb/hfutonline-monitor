// const moment = require('moment');
const performanceService = require('../services/performance');
const projectService = require('../services/project');

module.exports = {

  async getPerformanceData(ctx) {
    const { pid, user } = ctx.session;

    const projectAuth = await projectService.checkProjectAuth(pid, user.Id);
    if (!projectAuth) {
      ctx.body = {
        code: 403,
        data: '',
        msg: '没有该项目权限',
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
      msg: '',
    };
  },

};
