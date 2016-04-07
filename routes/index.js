var express = require('express');
var router = express.Router();

var manRouter = require("./categoryRouter");
var brandRouter = require("./brandRouter");
var userRouter = require("./userRouter");
var adminRouter = require("./adminRouter");
var orderRouter = require("./orderRouter");
var productRouter = require("./productRouter");
var commentRouter = require("./commentRouter");
var profilePhotoRouter = require("./profilePhotoRouter");




module.exports = function (passport) {

    require('../models/connectionDB');

    router.get('/', function (req, res, next) {
     //   console.log("bliat' "+req._body);
        console.log("login");


        res.render('index');
    });

    router.get('/login', function (req, res, next) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }));

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    router.get('/home', isLoggedIn, function (req, res, next) {
        res.render('home');
    });

    router.use('/upload', profilePhotoRouter);

        //var fileName = randomString.generate(12);
        //var pathToFile = __dirname.split("\\").slice(0, -1).join("/") + "/public/images/profilePhotoes/" + fileName;
        //fs.createReadStream(req.files.upload.path)
        //   .pipe(fs.createWriteStream(pathToFile).on('finish', function() {
        //       res.send("file was saved");
        //   }));


    router.use('/category', manRouter);
    router.use('/brand', brandRouter);
    router.use('/product', productRouter);
    router.use('/comment', commentRouter);
    router.use('/order', orderRouter);
    router.use('/user', userRouter);
    router.use('/admin', adminRouter);


    function isLoggedIn(req, res, next) {
        console.log("from isLoggedIn ");

        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }

    return router;
};

