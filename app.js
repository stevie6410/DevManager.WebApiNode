var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var dbInfoRouter = require('./routes/db-info.router');
var packageRouter = require('./routes/report-sync/package.router');
var reportSyncCrudRouter = require('./routes/report-sync/report-sync-crud-router');
var devManagerCrudRouter = require('./routes/dev-manager/dev-manager-crud-router');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//DevManager Base Routes
app.use('/api/dbinfo', dbInfoRouter);
app.use('/api', devManagerCrudRouter); //Always have this CRUD router last so that any overrides above are applied first

//Report Sync Routes
app.use('/api/reportsync/packages', packageRouter);
app.use('/api/reportsync', reportSyncCrudRouter); //Always have this CRUD router last so that any overrides above are applied first

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
