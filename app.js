var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotevn = require('dotenv').config();
var app = express();
const cors = require('cors');
app.use(cors());
const routeMiddleware = require('./middleware/route-loader');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routeMiddleware.routeLoader(app);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((error, req, res, next) => {
  console.log('inside error middleware()');
  console.log(error);

  let statusCode;

  if (
    error.name === 'ValidationError' ||
    error.name === 'MongoError' ||
    error.name === 'CastError'
  ) {
    if (error.message !== 'pool destroyed') {
      error.statusCode = 422;
    }
    if (error.name === 'CastError') {
      error.message = `invalid ${error.path}`;
    }
  }

  if (!error.statusCode) {
    error.statusCode = 500;
  }
  statusCode = error.statusCode;
  console.log(statusCode, error.message);
  res.status(statusCode).json({ status: statusCode, message: error.message });
});

module.exports = app;
