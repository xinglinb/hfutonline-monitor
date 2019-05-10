/**
 * restful api 子路由
 */

const router = require('koa-router')();
const performanceController = require('../controllers/performance');
const errorMoniterController = require('../controllers/errorMoniter');

const routers = router
  .get('/getPerformanceData', performanceController.getPerformanceData)
  .get('/getErrorMoniterData', errorMoniterController.getErrorMoniterData)
  .get('/getDetailErrorMoniterData', errorMoniterController.getDetailErrorMoniterData);


module.exports = routers;
