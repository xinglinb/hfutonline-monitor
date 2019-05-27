const fs = require('fs');
const mysql = require('mysql');

const dbQuery = (sql, values = []) => new Promise((res, rej) => {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'yuanyili',
    database: 'wdzj',
  });

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

const getWdzjData = async function () {
  const sql = `
    SELECT comment_number, star_number, tag
    FROM wdzj_platform
    `;
  const result = await dbQuery(sql);
  return result;
};

getWdzjData()
  .then(res => {
    const data = res.map(item => ({
      comment_number: item.comment_number,
      star_number: Number(item.star_number),
      default: /停业|跑路|提现困难|经侦介入/g.test(item.tag) ? 1 : 0,
    }));

    const dataStr = data.reduce((acc, i) => `${acc}
${i.comment_number},${i.star_number},${i.default}`, '');

    console.log(dataStr);

    fs.writeFile('wdzj_platform_data.txt', dataStr, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  });
