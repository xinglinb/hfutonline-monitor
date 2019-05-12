const dbQuery = require('../utils/db-query');

module.exports = {
  async register(params) {
    const sql = `
        INSERT INTO
        user(
          username,
          password,
          name,
          e_mail,
          avatar
        )
        VALUES( ? , ? , ? , ? , ? );
    `;
    const result = await dbQuery(sql, [
      params.username,
      params.password,
      params.name,
      params.e_mail,
      params.avatar,
    ]);
    return result;
  },

  async testUser(username, password) {
    const sql = `
        select * ,
        count(1) as num
        from user
        where username = ? AND password = ? ;
    `;
    const result = await dbQuery(sql, [
      username,
      password,
    ]);
    return result[0];
  },

  async getUserProject(uid) {
    const sql = `
        select pid
        from project_user
        where uid = ?
    `;
    const result = await dbQuery(sql, [uid]);
    return result;
  },

  async getUserInfo(uid) {
    const sql = `
        select *
        from user
        where Id = ?
    `;
    const result = await dbQuery(sql, [uid]);
    return result[0];
  },

  async getUsers() {
    const sql = `
        select Id, name
        from user
    `;
    const result = await dbQuery(sql, []);
    return result;
  },

  async updateUserSetting(params) {
    const sql = `
        UPDATE user
        SET
          username = ?,
          password = ?,
          name = ?,
          e_mail = ?,
          avatar = ?
        WHERE
          Id = ? ;
    `;
    const result = await dbQuery(sql, [
      params.username,
      params.password,
      params.name,
      params.e_mail,
      params.avatar,
      params.Id,
    ]);
    return result;
  },
};
