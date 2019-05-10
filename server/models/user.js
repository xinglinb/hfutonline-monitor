const dbQuery = require('../utils/db-query');

module.exports = {
  async login() {
    const sql = `
        select depart_id, department, level,
        count(1) as num
        from student
        group by depart_id, level
    `;
    const result = await dbQuery(sql);
    return result;
  },

  async register() {
    const sql = `
        select major_id, major, level,
        count(1) as num
        from student
        where depart_id=?
        group by major_id, level
    `;
    const result = await dbQuery(sql, []);
    return result;
  },
};
