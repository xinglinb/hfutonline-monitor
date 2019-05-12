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
      const errorDetailList = await errorMoniterModel.getDetailErrorMoniterData(pid, mid);

      return {
        errorTypes,
        errorDetailList,
      };
    } catch (e) {
      return e;
    }
  },

  async addOrUpdateErrorType({ request }) {
    try {
      const pid = 1;
      const oldMid = request.body.mid;
      if (!oldMid) {
        const errorTypes = await errorMoniterModel.getErrorMoniterTypes(pid);
        const newMid = errorTypes.length;
        await errorMoniterModel.addErrorType({
          pid,
          mid: newMid,
          ...request.body,
        });
        return {
          mid: newMid,
        };
      } else {
        await errorMoniterModel.updateErrorType({
          pid,
          mid: oldMid,
          ...request.body,
        });
        return {
          mid: oldMid,
        };
      }
    } catch (e) {
      return e;
    }
  },
};
