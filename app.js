const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
let ejs = require('ejs');

const app = express();

require('dotenv').config();

const mongoDB = process.env.mongoDBCluster;
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, () =>{});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`### We're connected to database ! ###`)
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const homeRouter = require('./routes/home_routes');
const surveyRouter = require('./routes/survey_routes');
const questionRouter = require('./routes/question_routes');
const authentificationRouter = require('./routes/authentification_routes');

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

app.use('/authentification', authentificationRouter);
app.use('/question', questionRouter);
app.use('/survey', surveyRouter);
app.use('/', homeRouter);


let port = 4000;

app.listen(port, () => {
    console.log(`The server is actually running on port ${port}`);
})

module.exports = app;
