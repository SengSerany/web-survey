const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const flashMidWare = require("./config/flash");
const ejs = require('ejs');

const app = express();

require('./config/passport')(passport);
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
const mongoDB = process.env.mongoDBCluster;
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, () =>{});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`### We're connected to database ! ###`)
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.sessionSecret,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie:{maxAge: 60000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(flashMidWare)

const homeRouter = require('./routes/home_routes');
const surveyRouter = require('./routes/survey_routes');
const questionRouter = require('./routes/question_routes');
const authentificationRouter = require('./routes/authentification_routes');



app.use('/authentification', authentificationRouter);
app.use('/question', questionRouter);
app.use('/survey', surveyRouter);
app.use('/', homeRouter);


let port = 4000;

app.listen(port, () => {
    console.log(`The server is actually running on port ${port}`);
})

module.exports = app;
