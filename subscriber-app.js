var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/subscriber/index');

const subscriber_app = express();


subscriber_app.use(logger('dev'));
subscriber_app.use(express.json());
subscriber_app.use(express.urlencoded({ extended: false }));
subscriber_app.use(express.static(path.join(__dirname, 'public')));

subscriber_app.use('/', indexRouter);


module.exports = subscriber_app;
