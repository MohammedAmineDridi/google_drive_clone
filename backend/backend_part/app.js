var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

// link with mongodb 

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/users'); //definir la chaine de connexion a BD 

db.then( ()=>{
    console.log("db users is connected ");
});




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// db variable 

//definir la variable de connexion
app.use(function(req, res, next){
	req.db =db;
	next();
});


// session and cookies app use 

app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"secret"

})) ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); // using middelwares  .
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
