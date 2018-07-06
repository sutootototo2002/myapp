var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var history = require('connect-history-api-fallback');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const config = require('./webpack.dev.js');

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

//webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
//const server = new webpackDevServer(compiler, options);


const resolve = file => path.resolve(__dirname, file)
// var indexRouter = require('./routes/index');


var app = express();
app.use(history());
//热加载
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler,{
  log:false,
  heartbeat:2000
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
var usersRouter = require('./routes/users');
app.use('/admin', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.use(express.static(path.join(__dirname,'dist')));
app.get('*', function (req, res) {
  let html = fs.readFileSync(resolve('./' + 'index.html'), 'utf-8')
  res.send(html)
})

module.exports = app;
