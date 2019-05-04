const Koa = require('koa');
const chalk = require('chalk');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');

const path = require('path');

const routers = require('./routers/index');
const config = require('./config');

const app = new Koa();

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname, './../static')
));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs',
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);

console.log(`app is starting at ${chalk.red(`http://127.0.0.1:${config.port}`)}`);
