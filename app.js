var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session');
var patientsRouter = require('./routes/patients');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('careProviderId', process.env.NUTS_CAREPROVIDER_ID);

const cookieSecret = "secret used for cookies"

app.use(cookieParser(cookieSecret));
app.use(session({
  secret: cookieSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));


app.use(function (req, res, next) {

  req.flash = function (type, msg) {
    if (this.session === undefined) throw Error('req.flash() requires sessions');
    let msgs = this.session.flash || {};
    msgs[type] = msgs[type] || [];
    msgs[type].push(msg)
  };

  res.locals.sessionFlash = req.session.flash || {};
  req.session.flash = {};

  next()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts/nuts-auth', express.static(__dirname + '/node_modules/@nuts-foundation/auth/dist'));
app.use('/style/irma-web-frontend', express.static(__dirname + '/node_modules/irma-web-frontend/dist'));
app.use('/style/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter);
app.use('/patients/', patientsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
