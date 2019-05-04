const router = require('koa-router')();

const api = require('./api');
const pages = require('./pages');

router.use('/', pages.routes(), pages.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

module.exports = router;
