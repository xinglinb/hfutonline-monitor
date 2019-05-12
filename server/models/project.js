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

  async addProject(params) {
    const sql = `
         INSERT INTO
         project(
           name,
           introduction,
           e_mail
         )
         VALUES( ? , ? , ? );
    `;
    const result = await dbQuery(sql, [
      params.name,
      params.introduction,
      params.e_mail,
    ]);
    return result;
  },

  async updateProject(params) {
    const sql = `
        UPDATE project
        SET
          name = ?,
          introduction = ?,
          e_mail = ?
        WHERE
          id = ? ;
    `;
    const result = await dbQuery(sql, [
      params.name,
      params.introduction,
      params.e_mail,
      params.id,
    ]);
    return result;
  },

  async addProjectUser(pid, members) {
    let sql = `
        INSERT INTO
        project_user(
          pid,
          uid
        )
        VALUES
    `;
    members.forEach(item => {
      sql += `(${pid}, ${item}),`;
    });
    sql = sql.slice(0, sql.length - 1);
    const result = await dbQuery(sql, []);
    return result;
  },

  async deleteProjectUser(pid) {
    const sql = `
        DELETE FROM project_user
        WHERE pid = ?;
    `;
    const result = await dbQuery(sql, [pid]);
    return result;
  },

  async selectProjects(pids) {
    let sql = `
        select *
        from project
        where id in (`;
    pids.forEach(({ pid }) => {
      sql += `${pid},`;
    });
    sql = sql.slice(0, sql.length - 1);
    sql += ')';

    const result = await dbQuery(sql, []);
    return result;
  },

  async getProjectInfo(pid) {
    const sql = `
        select *
        from project
        where id = ?;
    `;
    const result = await dbQuery(sql, [pid]);
    return result[0];
  },
  async getProjectUser(pid) {
    const sql = `
        select uid
        from project_user
        where pid = ?
    `;
    const result = await dbQuery(sql, [pid]);
    return result;
  },
};
