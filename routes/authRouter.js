//var authRouter = require('express').Router();
//var mongoose = require('mongoose');
//var Handler = require('../handlers/authHandler');
//
//module.exports = (function () {
//
//    var handler = new Handler();
//
//    authRouter.get('/login', function (req, res, next) {
//        res.render('login', { message: req.flash('loginMessage')});
//    });
//
//    authRouter.post('/login', findUser.findUser, passport.authenticate('local-login', {
//        successRedirect : '/home',
//        failureRedirect : '/login',
//        failureFlash : true
//    }));
//
//
//
//    authRouter.get('/register',function (req, res, next) {
//        res.render('register', { message: req.flash('loginMessage')});
//    });
//
//    authRouter.post('/register', chackOnUserOlreadyExists.isExixts, userHandler.createUser);
//
//
//
//    authRouter.post('/login', );
//    authRouter.delete('/register', handler.deleteUserById);
//
//    return authRouter;
//})();