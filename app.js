var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// var index = require('./routes/index');
// var packageRouter = require('./routes/packages.router');
// var workflowRouter = require('./routes/workflow.router');
// var workflowStageRouter = require('./routes/workflow-stage.router');
var deployEnvironmentRouter = require('./routes/deploy-environment.router');
// var reportServerRouter = require('./routes/report-server.router');
var databaseRouter = require('./routes/database.router');
// var deploymentRouter = require('./routes/deployment.router');
// var deploymentEventRouter = require('./routes/deployment-event.router');
var newWorldRouter = require('./routes/new-world.router');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/api/packages', packageRouter);
// app.use('/api/workflows', workflowRouter);
// app.use('/api/workflowstages', workflowStageRouter);
app.use('/api/deployenvironments', deployEnvironmentRouter);
// app.use('/api/reportservers', reportServerRouter);
app.use('/api/databases', databaseRouter);
// app.use('/api/deployments', deploymentRouter);
// app.use('/api/deploymentevents', deploymentEventRouter);

app.use('/api/newworld', newWorldRouter);

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
