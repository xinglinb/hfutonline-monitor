/**
 * restful api 子路由
 */

const router = require('koa-router')();
const apiController = require('../controllers/api/index');

const routers = router
  .get('/getMoniterData', apiController.getMoniterData);


module.exports = routers;
