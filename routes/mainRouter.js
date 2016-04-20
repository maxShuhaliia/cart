var express = require('express');
var router = express.Router();

var categoryRouter = require("./categoryRouter");
var brandRouter = require("./brandRouter");
var userRouter = require("./userRouter");
var adminRouter = require("./adminRouter");
var orderRouter = require("./orderRouter");
var productRouter = require("./productRouter");
var commentRouter = require("./commentRouter");
var profilePhotoRouter = require("./profilePhotoRouter");
var chackedOnLogIn = require('../config/auth/chachOnLoggedIn');

module.exports = function () {

    router.get('/', function (req, res, next) {
        res.render('home'); /// home
    });

    router.get('/forms', function (req, res, next) {
        res.render('forms');
    });

    router.get('/home', function (req, res) {
        res.render('home');
    });

    router.use('/upload', chackedOnLogIn.isLoggedIn, profilePhotoRouter);
    router.use('/category', categoryRouter);
    router.use('/brand', brandRouter);
    router.use('/product', productRouter);
    router.use('/comment', chackedOnLogIn.isLoggedIn, commentRouter);
    router.use('/order',  orderRouter);
    router.use('/user', /*chackedOnLogIn.isLoggedIn,*/ userRouter);
    router.use('/admin', /*chackedOnLogIn.isLoggedIn,*/ adminRouter);

    return router;
};

