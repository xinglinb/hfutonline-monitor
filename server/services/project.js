const projectModel = require('../models/project');
const errorMoniterModel = require('../models/errorMoniter');

module.exports = {
  async checkProjectAuth(pid, uid) {
    try {
      const projectAuth = await projectModel.checkProjectAuth(pid, uid);
      return !!projectAuth.num;
    } catch (e) {
      return e;
    }
  },

  async addOrUpdateProject({ request, session }) {
    try {
      const oldPid = request.body.id;
      const members = JSON.parse(request.body.members);
      const { user = {} } = session;
      if (!oldPid) {
        const { insertId } = await projectModel.addProject(request.body);
        await projectModel.addProjectUser(insertId, members);
        if (members.find(uid => uid === user.Id)) {
          session.pid = insertId;
        }
        console.log(insertId);

        await errorMoniterModel.addErrorType({
          pid: insertId,
          mid: 0,
          type_name: 'allError',
          param_one: 'message',
          param_two: 'stack',
          param_three: 'res',
          param_four: 'req',
          param_five: 'actionType',
        });
        return {
          pid: insertId,
        };
      } else {
        console.log(request.body);

        await projectModel.updateProject(request.body);
        await projectModel.deleteProjectUser(oldPid);
        await projectModel.addProjectUser(oldPid, members);
        return {
          pid: oldPid,
        };
      }
    } catch (e) {
      return e;
    }
  },


  async changeProject({ request, session }) {
    try {
      const { pid } = request.body;
      const { user } = session;
      const projectAuth = await projectModel.checkProjectAuth(pid, user.Id);
      if (!projectAuth.num) {
        return {
          code: 500,
          data: '',
          msg: '没有权限',
        };
      }
      session.pid = pid;
      return {
        code: 200,
        data: '',
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },

  async getProjectInfo({ session }) {
    try {
      const { pid } = session;
      const projectInfo = await projectModel.getProjectInfo(pid);
      const members = await projectModel.getProjectUser(pid);
      return {
        code: 200,
        data: {
          ...projectInfo,
          members: members.map(i => i.uid),
        },
        msg: '',
      };
    } catch (e) {
      return e;
    }
  },
};
