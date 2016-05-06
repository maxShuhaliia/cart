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
    require('../helpers/connectionDB');

    router.use('/admin', function (req, res, next) {
        res.render('admin');
    });

    var mainRouter = require('./mainRouter')();

    router.use(mainRouter);

    return router;
};

