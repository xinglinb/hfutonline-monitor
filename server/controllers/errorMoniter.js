// const moment = require('moment');
const errorMoniterService = require('../services/errorMoniter');
const projectService = require('../services/project');

module.exports = {

  async getErrorMoniterData(ctx) {
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
    const statData = await errorMoniterService.getErrorMoniterData(pid);
    ctx.body = {
      code: 200,
      data: statData,
      msg: '',
    };
  },

  async getDetailErrorMoniterData(ctx) {
    const { pid, user } = ctx.session;
    const { mid } = ctx.request.query;
    const projectAuth = await projectService.checkProjectAuth(pid, user.Id);
    if (!projectAuth) {
      ctx.body = {
        code: 403,
        data: '',
        msg: '没有该项目权限',
      };
      return;
    }
    const statData = await errorMoniterService.getDetailErrorMoniterData(pid, mid);
    ctx.body = {
      code: 200,
      data: statData,
      msg: '',
    };
  },

  async addOrUpdateErrorType(ctx) {
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
    const statData = await errorMoniterService.addOrUpdateErrorType(ctx);
    ctx.body = {
      code: 200,
      data: statData,
      msg: '',
    };
  },

};
