var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/publisher/index');

const publisher_app = express();



publisher_app.use(logger('dev'));
publisher_app.use(express.json());
publisher_app.use(express.urlencoded({ extended: false }));
publisher_app.use(express.static(path.join(__dirname, 'public')));

publisher_app.use('/', indexRouter);

// catch 404 and forward to error handler
publisher_app.use(function(req, res, next) {
  next(createError(404));
});





module.exports = publisher_app;
