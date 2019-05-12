const projectService = require('../services/project');

module.exports = {
  async addOrUpdateProject(ctx) {
    const statData = await projectService.addOrUpdateProject(ctx);
    ctx.body = {
      code: 200,
      data: statData,
      msg: '',
    };
  },

  async changeProject(ctx) {
    const result = await projectService.changeProject(ctx);
    ctx.body = result;
  },

  async getProjectInfo(ctx) {
    const result = await projectService.getProjectInfo(ctx);
    ctx.body = result;
  },

};
