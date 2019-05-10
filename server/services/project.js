const projectModel = require('../models/project');

module.exports = {
  async checkProjectAuth(pid, uid) {
    try {
      const projectAuth = await projectModel.checkProjectAuth(pid, uid);
      return !!projectAuth.num;
    } catch (e) {
      return e;
    }
  },
};
