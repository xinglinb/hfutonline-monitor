const moment = require('moment');
const errorMoniterModel = require('../models/errorMoniter');

module.exports = {
  async getErrorMoniterData(pid) {
    try {
      const errorTypes = await errorMoniterModel.getErrorMoniterTypes(pid);
      const statData = await errorMoniterModel.getErrorMoniterData(pid);

      const result = errorTypes.map(({ mid, type_name }) => {
        const data = statData.filter(i => i.mid === mid);
        return {
          mid,
          type_name,
          statData: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(i => {
            const time = moment().subtract(i, 'minutes').format('YYYY-MM-DD HH:mm');
            const myData = data.find(x => x.stat_date === time);
            return {
              stat_date: time,
              tatol: myData ? myData.tatol : 0,
            };
          }),
        };
      });

      return result;
    } catch (e) {
      return e;
    }
  },

  async getDetailErrorMoniterData(pid, mid) {
    try {
      const errorTypes = await errorMoniterModel.getErrorMoniterTypeByMid(pid, mid);
      const statData = await errorMoniterModel.getDetailErrorMoniterData(pid, mid);


      return {
        errorTypes,
        statData,
      };
    } catch (e) {
      return e;
    }
  },
};
