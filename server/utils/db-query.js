const allConfig = require('../config');

const config = allConfig.database;
const mysql = require('mysql');

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
});

module.exports = (sql, values = []) => new Promise((res, rej) => {
  pool.getConnection((err, connection) => {
    if (err) {
      rej(err);
      return;
    }

    connection.query({ sql, values }, (connectErr, rows) => {
      if (connectErr) {
        rej(connectErr);
      } else {
        res(rows);
      }
      connection.release();
    });
  });
});

