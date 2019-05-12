const userModel = require('../models/user');

module.exports = () => {
  return async function (ctx, next) {
    const { url } = ctx.request;
    if (!/^\/api/.test(url)) {
      await next();
      return;
    }
    const { user } = ctx.session;
    if (!user) {
      ctx.body = {
        code: 405,
        data: '',
        msg: '用户未登录',
      };
      return;
    }
    const { username, password } = user;
    const { num } = await userModel.testUser(username, password);
    if (!num) {
      ctx.body = {
        code: 405,
        data: '',
        msg: '用户未登录',
      };
      return;
    }
    await next();
  };
};
