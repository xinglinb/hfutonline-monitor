/**
 * restful api 子路由
 */

const router = require('koa-router')();
const pagesController = require('../controllers/pages/index');

const routers = router
  .get('home', pagesController.indexPage);


module.exports = routers;
