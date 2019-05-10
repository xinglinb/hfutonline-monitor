const router = require('koa-router')();

const api = require('./api');
const report = require('./report');
const pages = require('./pages');
const user = require('./user');

router.use('/', pages.routes(), pages.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/report', report.routes(), report.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;
