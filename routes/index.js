var express = require('express');
var router = express.Router();

var FindUser = require("../config/auth/findUserInDb");
var findUser = new FindUser();

var ChackOnUserOlreadyExists = require('../config/auth/chackOnUserOlreadyExists');
var chackOnUserOlreadyExists = new ChackOnUserOlreadyExists();
var UserHandler = require('../handlers/userHandler');
var userHandler = new UserHandler();
var chackedOnLogIn = require("../config/auth/chachOnLoggedIn");

module.exports = function (passport, app) {
    require('../models/connectionDB');

    router.get('/login', function (req, res, next) {
        res.render('login', { message: req.flash('loginMessage')});
    });

    router.get('/index', function (req, res, next) {
        res.render('index');
    });

    router.post('/login', findUser.findUser, passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }));

    router.post('/register', chackOnUserOlreadyExists.isExixts, userHandler.createUser);

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    router.use('/admin', function (req, res, next) {
        res.render('admin');
    });


    var mainRouter = require('./mainRouter')();

    router.use(mainRouter);



    return router;
};

