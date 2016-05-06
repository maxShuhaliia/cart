var express = require('express');
var router = express.Router();

var brandRouter = require("./brandRouter");
var userRouter = require("./userRouter");
var orderRouter = require("./orderRouter");
var productRouter = require("./productRouter");
var commentRouter = require("./commentRouter");
var profilePhotoRouter = require("./profilePhotoRouter");
var hireRouter = require("./hireRouter");
var chackedOnLogIn = require('../config/auth/chachOnLoggedIn');


module.exports = function () {

    router.get('/', function (req, res, next) {
        res.render('home'); /// home
    });

    router.use('/hire',  hireRouter);
    router.use('/upload', /*chackedOnLogIn.isLoggedIn,*/ profilePhotoRouter);
    router.use('/brand', brandRouter);
    router.use('/product', productRouter);
    router.use('/comment', chackedOnLogIn.isLoggedIn, commentRouter);
    router.use('/order',  orderRouter);
    router.use('/user', /*chackedOnLogIn.isLoggedIn,*/ userRouter);

    return router;
};

