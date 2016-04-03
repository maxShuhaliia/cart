var express = require('express');
var router = express.Router();

var manRouter = require("./manRouter");
var womenRouter = require("./womenRouter");
var brandRouter = require("./brandRouter");
var userRouter = require("./userRouter");
var adminRouter = require("./adminRouter");
var orderRouter = require("./orderRouter");
var productRouter = require("./productRouter");
var commentRouter = require("./commentRouter");

module.exports = (function(){

  require('../models/connectionDB');

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.use('/man', manRouter);
  router.use('/women', womenRouter);
  router.use('/brand', brandRouter);
  router.use('/user', userRouter);

  router.use('/admin', adminRouter);
  router.use('/order', orderRouter);

  router.use('/product', productRouter);
  router.use('/comment', commentRouter);
return router;
})();

