const userModel = require('../models/user');
const projectModel = require('../models/project');

module.exports = {
  async login({ request, session }) {
    try {
      const { username, password } = request.body;
      const user = await userModel.testUser(username, password);
      if (!user.num) {
        return {
          code: 500,
          data: '',
          msg: '账号或者密码错误',
        };
      }
      session.user = user;

      const projects = await userModel.getUserProject(user.Id);
      console.log(projects);


      session.pid = projects[0].pid;
      return {
        code: 200,
        data: '',
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },

  async loginout(ctx) {
    try {
      ctx.session.pid = null;
      ctx.session.user = null;

      return {
        code: 200,
        data: '',
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },

  async register({ request, session }) {
    try {
      const params = {
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        ...request.body,
      };
      const { insertId } = await userModel.register(params);
      session.user = {
        ...params,
        Id: insertId,
      };
      return {
        code: 200,
        data: '',
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },

  async getUserInfo({ session }) {
    try {
      const { user, pid } = session;
      const userInfo = await userModel.getUserInfo(user.Id);
      const pids = await userModel.getUserProject(user.Id);
      let projects = [];
      if (pids.length) {
        projects = await projectModel.selectProjects(pids);
      }
      return {
        code: 200,
        data: {
          userInfo,
          projects,
          pid,
        },
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },

  async getUsers() {
    try {
      const users = await userModel.getUsers();
      return {
        code: 200,
        data: users,
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },

  async updateUserSetting({ request, session }) {
    try {
      await userModel.updateUserSetting(request.body);
      session.user = request.body;
      return {
        code: 200,
        data: '',
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },
};
