const userService = require('../services/user');

module.exports = {

  async login(ctx) {
    const result = await userService.login(ctx);
    ctx.body = result;
  },

  async loginout(ctx) {
    const result = await userService.loginout(ctx);
    ctx.body = result;
  },

  async register(ctx) {
    const result = await userService.register(ctx);
    ctx.body = result;
  },

  async getUserInfo(ctx) {
    const result = await userService.getUserInfo(ctx);
    ctx.body = result;
  },

  async getUsers(ctx) {
    const result = await userService.getUsers(ctx);
    ctx.body = result;
  },

  async updateUserSetting(ctx) {
    const result = await userService.updateUserSetting(ctx);
    ctx.body = result;
  },
};
