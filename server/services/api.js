const apiModel = require('../models/api');

module.exports = {
  async getDepartCount({ cache }) {
    const departDetail = cache.get('departDetail');
    if (departDetail) {
      return {
        ...departDetail,
        fromCache: true,
      };
    } else {
      const data = await apiModel.getDepartCount();
      const departList = data.filter(item => item.depart_id !== 0);
      const result = {
        tatolNum: departList.reduce((acc, item) => acc + item.num, 0),
        departList: departList
          .reduce((acc, item) => {
            const accIndex = acc.findIndex(i => i.depart_id === item.depart_id);
            if (accIndex > -1) {
              acc[accIndex].levels.push({
                key: item.level,
                num: item.num,
              });
            } else {
              acc.push({
                depart_id: item.depart_id,
                department: item.department,
                levels: [{
                  key: item.level,
                  num: item.num,
                }],
              });
            }
            return acc;
          }, []),
      };
      cache.set('departDetail', result);
      return {
        ...result,
        fromCache: false,
      };
    }
  },

  async getMajorDetailByDepart({ cache, request }) {
    const { depart_id } = request.query;
    const majorDetail = cache.get(`majorDetail_${depart_id}`);
    if (majorDetail) {
      return {
        ...majorDetail,
        fromCache: true,
      };
    } else {
      const data = await apiModel.getMajorDetailByDepart(depart_id);
      const result = {
        tatolNum: data.reduce((acc, item) => acc + item.num, 0),
        majorList: data
          .reduce((acc, item) => {
            const accIndex = acc.findIndex(i => i.major_id === item.major_id);
            if (accIndex > -1) {
              acc[accIndex].levels.push({
                key: item.level,
                num: item.num,
              });
            } else {
              acc.push({
                major_id: item.major_id,
                major: item.major,
                levels: [{
                  key: item.level,
                  num: item.num,
                }],
              });
            }
            return acc;
          }, []),
      };
      cache.set(`majorDetail_${depart_id}`, result);
      return {
        ...result,
        fromCache: false,
      };
    }
  },
};
