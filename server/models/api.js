const dbQuery = require('../utils/db-query');

module.exports = {
  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getDepartCount() {
    const sql = `
        select department,
        count(1) as num
        from student
        group by depart_id
        order by num desc
    `;
    const result = await dbQuery(sql);
    return result;
  },

};
