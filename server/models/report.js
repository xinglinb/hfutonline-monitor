const dbQuery = require('../utils/db-query');

module.exports = {
  async reportPerformanceData(performanceData) {
    const sql = `
        INSERT INTO
        performance(
          pid,
          navigator_appVersion,
          navigator_platform,
          navigator_vendor,
          navigator_language,
          unload_prePage,
          dns_tcp,
          res_html,
          res_js,
          parse_resources,
          dom_render,
          all_time,
          timing,
          create_time
        )
        VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);
    `;
    const result = await dbQuery(sql, [
      performanceData.pid,
      performanceData.navigator_appVersion,
      performanceData.navigator_platform,
      performanceData.navigator_vendor,
      performanceData.navigator_language,
      performanceData.unload_prePage,
      performanceData.dns_tcp,
      performanceData.res_html,
      performanceData.res_js,
      performanceData.parse_resources,
      performanceData.dom_render,
      performanceData.all_time,
      performanceData.timing,
      performanceData.create_time,
    ]);
    return result;
  },

  async isPerformanceStatDataSaved(pid, stat_date) {
    const sql = `
        select *,
        count(1) as num
        from performance_stat
        where pid = ? AND stat_date = ? ;
    `;
    const result = await dbQuery(sql, [pid, stat_date]);
    return result[0];
  },

  async insertPerformanceStatData(statData) {
    const sql = `
        INSERT INTO
        performance_stat(
          pid,
          tatol,
          stat_date,
          avg_unload_prePage,
          avg_dns_tcp,
          avg_res_html,
          avg_res_js,
          avg_parse_resources,
          avg_dom_render,
          avg_all_time
        )
        VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);
    `;
    const result = await dbQuery(sql, [
      statData.pid,
      statData.tatol,
      statData.stat_date,
      statData.avg_unload_prePage,
      statData.avg_dns_tcp,
      statData.avg_res_html,
      statData.avg_res_js,
      statData.avg_parse_resources,
      statData.avg_dom_render,
      statData.avg_all_time,
    ]);
    return result;
  },

  async updatePerformanceStatData(statData) {
    const sql = `
        UPDATE performance_stat
        SET
          tatol = ?,
          avg_unload_prePage = ?,
          avg_dns_tcp = ?,
          avg_res_html = ?,
          avg_res_js = ?,
          avg_parse_resources = ?,
          avg_dom_render = ?,
          avg_all_time = ?
        WHERE
          pid = ? AND stat_date = ?;
    `;
    const result = await dbQuery(sql, [
      statData.tatol,
      statData.avg_unload_prePage,
      statData.avg_dns_tcp,
      statData.avg_res_html,
      statData.avg_res_js,
      statData.avg_parse_resources,
      statData.avg_dom_render,
      statData.avg_all_time,
      statData.pid,
      statData.stat_date,
    ]);
    return result;
  },

  async selectMoniterParamsName(mid, pid) {
    const sql = `
        SELECT *
        FROM error_type
        WHERE mid=? AND pid=?
    `;
    const result = await dbQuery(sql, [mid, pid]);
    if (result.length) {
      return result[0];
    } else {
      throw new Error('mid || pid 有误');
    }
  },

  async reportErrorData(errorData) {
    const sql = `
        INSERT INTO
        error_moniter(
          pid,
          mid,
          navigator_appVersion,
          navigator_platform,
          navigator_vendor,
          navigator_language,
          param_one,
          param_two,
          param_three,
          param_four,
          param_five,
          create_time
        )
        VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );
    `;
    const result = await dbQuery(sql, [
      errorData.pid,
      errorData.mid,
      errorData.navigator_appVersion,
      errorData.navigator_platform,
      errorData.navigator_vendor,
      errorData.navigator_language,
      errorData.moniterParams.param_one,
      errorData.moniterParams.param_two,
      errorData.moniterParams.param_three,
      errorData.moniterParams.param_four,
      errorData.moniterParams.param_five,
      errorData.create_time,
    ]);

    return result;
  },

  async isErrorStatDataSaved(pid, mid, stat_date) {
    const sql = `
        select *,
        count(1) as num
        from error_moniter_stat
        where pid = ? AND mid = ? AND stat_date = ? ;
    `;
    const result = await dbQuery(sql, [pid, mid, stat_date]);
    return result[0];
  },

  async insertErrorStatData(statData) {
    const sql = `
        INSERT INTO
        error_moniter_stat(
          pid,
          mid,
          stat_date,
          tatol,
          ids
        )
        VALUES(? , ? , ? , ? , ?);
    `;
    const result = await dbQuery(sql, [
      statData.pid,
      statData.mid,
      statData.stat_date,
      statData.tatol,
      statData.ids,
    ]);
    return result;
  },

  async updateErrorStatData(statData) {
    const sql = `
        UPDATE error_moniter_stat
        SET
          tatol = ?,
          ids = ?
        WHERE
          pid = ? AND mid = ? AND stat_date = ?;
    `;
    const result = await dbQuery(sql, [
      statData.tatol,
      statData.ids,
      statData.pid,
      statData.mid,
      statData.stat_date,
    ]);
    return result;
  },
};
