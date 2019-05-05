const apiService = require('../../services/api');

module.exports = {

  async getDepartCount(ctx) {
    const res = await apiService.getDepartCount(ctx);
    ctx.body = res;
  },

  async getMajorDetailByDepart(ctx) {
    const res = await apiService.getMajorDetailByDepart(ctx);
    ctx.body = res;
  },
};
