/**
 * restful api 子路由
 */

const router = require('koa-router')();
const reportController = require('../controllers/report');

const routers = router
  .get('/performanceData', reportController.reportPerformanceData)
  .get('/errorData', reportController.reportErrorData);


module.exports = routers;
