/**
 * restful api 子路由
 */

const router = require('koa-router')();
const apiController = require('../controllers/api/index');

const routers = router
  .get('/getDepartCount', apiController.getDepartCount)
  .get('/getMajorDetailByDepart', apiController.getMajorDetailByDepart);


module.exports = routers;
