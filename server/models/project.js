const dbQuery = require('../utils/db-query');

module.exports = {
  async checkProjectAuth(pid, uid) {
    const sql = `
        select * ,
        count(1) as num
        from project_user
        where pid = ? AND uid = ? ;
    `;
    const result = await dbQuery(sql, [pid, uid]);
    return result[0];
  },
};
