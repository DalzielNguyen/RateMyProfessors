const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const UserController = require('./controllers/User');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/index');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		secret: 'RateMyProfessors',
		saveUninitialized: true,
		resave: true
	})
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(async function(req, res, next){
	if (req.session.username){
		res.locals.user = await UserController.getUserInfo(req.session.username);
	}
	next();
});

require('./Database');
require('./Router')(app);

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
