const Koa = require('koa');
const chalk = require('chalk');
const staticCache = require('koa-static-cache');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const session = require('koa-session');
const koaLogger = require('koa-logger');
const compress = require('koa-compress');

const path = require('path');

const cacheMiddleware = require('./middleware/cache');
const checkLoginMiddleware = require('./middleware/check-login');
const routers = require('./routers/index');
const config = require('./config');

const app = new Koa();

app.keys = ['some secret hurr'];

// 配置session中间件
app.use(session(config.session, app));

// 自定义的数据缓存层
app.use(cacheMiddleware(config.cacheTime));

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

app.use(compress(config.compress));

// 配置静态资源加载中间件
app.use(staticCache(
  path.join(__dirname, './../static'),
  {
    maxAge: 365 * 24 * 60 * 60,
  }
));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs',
}));

app.use(checkLoginMiddleware());

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);

console.log(`app is starting at ${chalk.red(`http://127.0.0.1:${config.port}`)}`);
