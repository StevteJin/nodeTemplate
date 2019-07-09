var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//首页
var index = require('./routes/index');

//生成一个express实例 app。
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//设置模板引擎为html
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//加载日志中间件
app.use(logger('dev'));
//加载解析json中间件
app.use(express.json());
//加载解析urlencoded请求体的中间件。
app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件。
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));
//路由控制器
app.use('/', [index]);

//捕获404错误，并转发到错误处理器
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
