const apiModel = require('../../models/api');

module.exports = {

  async getMoniterData(ctx) {
    const res = await apiModel.getDepartCount();
    ctx.body = res;
  },

};
