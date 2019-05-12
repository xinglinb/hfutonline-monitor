/**
 * restful api 子路由
 */

const router = require('koa-router')();
const pagesController = require('../controllers/pages');

const routers = router
  .get('', pagesController.indexPage)
  .get('errorMoniter', pagesController.indexPage)
  .get('projectSetting', pagesController.indexPage)
  .get('addProject/projectMessage', pagesController.indexPage)
  .get('addProject/projectSetting', pagesController.indexPage)
  .get('addProject/addSdk', pagesController.indexPage)
  .get('addProject/addFinished', pagesController.indexPage)
  .get('register', pagesController.indexPage)
  .get('login', pagesController.indexPage);


module.exports = routers;
