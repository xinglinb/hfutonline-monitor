// const moment = require('moment');
const errorMoniterService = require('../services/errorMoniter');
const projectService = require('../services/project');

module.exports = {

  async getErrorMoniterData(ctx) {
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
    const statData = await errorMoniterService.getErrorMoniterData(pid);
    ctx.body = {
      code: 200,
      data: statData,
      message: '',
    };
  },

  async getDetailErrorMoniterData(ctx) {
    const { pid, mid, uid } = ctx.request.query;
    const projectAuth = await projectService.checkProjectAuth(pid, uid);
    if (!projectAuth) {
      ctx.body = {
        code: 403,
        data: '',
        message: '没有该项目权限',
      };
      return;
    }
    const statData = await errorMoniterService.getDetailErrorMoniterData(pid, mid);
    ctx.body = {
      code: 200,
      data: statData,
      message: '',
    };
  },

};
