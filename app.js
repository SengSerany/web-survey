const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let ejs = require('ejs');


const app = express();

require('dotenv').config();

const homeRouter = require('./routes/home');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);
app.use(function(req, res, next) {
    next(createError(404));
  });
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
  res.render('error');
});

let port = 4000;

app.listen(port, () => {
    console.log(`The server is actually running on port ${port}`);
})

module.exports = app;
