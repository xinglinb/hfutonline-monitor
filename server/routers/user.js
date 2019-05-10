/**
 * restful api 子路由
 */

const router = require('koa-router')();
const reportController = require('../controllers/user');

const routers = router
  .post('/login', reportController.login)
  .post('/loginout', reportController.loginout)
  .post('/register', reportController.register);


module.exports = routers;
