var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var html = require('html');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var expressSession = require('express-session')
var flash = require("connect-flash");

var app = express();

process.env.NODE_ENV = "development";

app.engine('html', cons.underscore);
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'public/'));
app.set("view engine", "html");

app.use(logger('dev')); // for morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');

app.use(expressSession({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    rolling: true,
    saveUninitialized: false  // discuss for every project
}));


app.use(express.static(path.join(__dirname, 'public')));
var routes = require('./routes/index')();

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;