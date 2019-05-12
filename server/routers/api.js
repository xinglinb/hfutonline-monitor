/**
 * restful api 子路由
 */

const router = require('koa-router')();
const performanceController = require('../controllers/performance');
const errorMoniterController = require('../controllers/errorMoniter');
const projectController = require('../controllers/project');
const usertController = require('../controllers/user');

const routers = router
  .get('/getPerformanceData', performanceController.getPerformanceData)
  .get('/getErrorMoniterData', errorMoniterController.getErrorMoniterData)
  .get('/getDetailErrorMoniterData', errorMoniterController.getDetailErrorMoniterData)
  .post('/addOrUpdateErrorType', errorMoniterController.addOrUpdateErrorType)
  .post('/addOrUpdateProject', projectController.addOrUpdateProject)
  .post('/changeProject', projectController.changeProject)
  .get('/getProjectInfo', projectController.getProjectInfo)
  .post('/updateUserSetting', usertController.updateUserSetting)
  .get('/getUserInfo', usertController.getUserInfo)
  .get('/getUsers', usertController.getUsers);


module.exports = routers;
