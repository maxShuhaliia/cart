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

var FindUser = require("../config/auth/findUserInDb");
var findUser = new FindUser();

module.exports = function (passport, app) {
    require('../models/connectionDB');

    router.get('/', function (req, res, next) {
        res.render('index');
    });
    router.get('/forms', function (req, res, next) {
        res.render('forms');
    });

    router.get('/login', function (req, res, next) {
        res.render('login', { message: req.flash('loginMessage')});
    });

    router.post('/login', findUser.findUser, passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }));

    var ChackOnUserOlreadyExists = require('../config/auth/chackOnUserOlreadyExists');
    var chackOnUserOlreadyExists = new ChackOnUserOlreadyExists();
    var UserHandler = require('../handlers/userHandler');
    var userHandler = new UserHandler();

    router.post('/register', chackOnUserOlreadyExists.isExixts, userHandler.createUser);

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    router.get('/home', isLoggedIn, function (req, res) {
        res.render('home');
    });

    var authRouter = require('./authRouter');
    //router.use('/auth', authRouter);

    router.use('/upload', profilePhotoRouter);
    router.use('/category', categoryRouter);                     ///
    router.use('/brand', brandRouter);                           ///
    router.use('/product', productRouter);                      //
    router.use('/comment', commentRouter);
    router.use('/order', orderRouter);
    router.use('/user', userRouter);                        ///
    router.use('/admin', adminRouter);                      ///


    function isLoggedIn(req, res, next) {
        console.log("from isLoggedIn ");
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    return router;
};

