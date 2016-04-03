var womanModel = require('../models/womanModel');
var validator = require('validator');

module.exports = function() {

   this.createWomenCategory = function(req, res, next) {
        res.send(" create women category " + req.body.name + " was created!!!");
    }
   this.getWomenCategories = function(req, res, next) {
        res.send("get all categories for woman");
    }
    this.getWomenCategory = function(req, res, next) {
        res.send("get women's category whith id" + req.params.name);
    }
    this.updateWomenCategory = function(req, res, next) {
        res.send("update women category by id  " + req.body.name );
    }
    this.deleteWomenCategory = function(req, res, next) {
        res.send("women's category with id " + req.params.name + " was deleted!!!");
    }
};
