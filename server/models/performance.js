const dbQuery = require('../utils/db-query');

module.exports = {
  async getPerformanceStatData(pid, stat_date) {
    const sql = `
        select *
        from performance_stat
        where pid = ? AND stat_date = ? ;
    `;
    const result = await dbQuery(sql, [pid, stat_date]);
    return result[0];
  },

  async getSevenAvgAllTime(pid, stat_date) {
    const sql = `
        select avg_all_time, stat_date
        from performance_stat
        where pid = ? AND stat_date = ? ;
    `;
    const result = await dbQuery(sql, [pid, stat_date]);
    return result;
  },
};
