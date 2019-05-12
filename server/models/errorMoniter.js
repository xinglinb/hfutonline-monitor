const moment = require('moment');
const dbQuery = require('../utils/db-query');

module.exports = {
  async getErrorMoniterTypes(pid) {
    const sql = `
        select *
        from error_type
        where pid = ?;
    `;
    const result = await dbQuery(sql, [pid]);
    return result;
  },

  async getErrorMoniterData(pid) {
    const sql = `
        select *
        from error_moniter_stat
        where pid = ? AND stat_date > ?;
    `;
    const result = await dbQuery(sql, [pid, moment().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm')]);
    return result;
  },

  async getErrorMoniterTypeByMid(pid, mid) {
    const sql = `
        select *
        from error_type
        where pid = ? AND mid = ?;
    `;
    const result = await dbQuery(sql, [pid, mid]);
    return result[0];
  },

  async getDetailErrorMoniterData(pid, mid) {
    const sql = `
        select *
        from error_moniter
        where pid = ? AND mid = ? AND create_time > ? ;
    `;
    const result = await dbQuery(sql, [pid, mid, moment().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm')]);
    return result;
  },

  async addErrorType(params) {
    const sql = `
         INSERT INTO
         error_type(
           mid,
           pid,
           type_name,
           param_one,
           param_two,
           param_three,
           param_four,
           param_five
         )
         VALUES( ? , ? , ? , ? , ? , ? , ? , ? );
    `;
    const result = await dbQuery(sql, [
      params.mid,
      params.pid,
      params.type_name,
      params.param_one,
      params.param_two,
      params.param_three,
      params.param_four,
      params.param_five,
    ]);
    return result;
  },

  async updateErrorType(params) {
    const sql = `
        UPDATE error_type
        SET
          type_name = ?,
          param_one = ?,
          param_two = ?,
          param_three = ?,
          param_four = ?,
          param_five = ?
        WHERE
         pid = ? AND mid = ? ;
    `;
    const result = await dbQuery(sql, [
      params.type_name,
      params.param_one,
      params.param_two,
      params.param_three,
      params.param_four,
      params.param_five,
      params.pid,
      params.mid,
    ]);
    return result;
  },
};
