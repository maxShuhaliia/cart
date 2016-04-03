
var manModel = require('../models/manModel');
var validator = require('validator');

module.exports = function() {

  this.createManCategory = function(req, res, next) {
        res.send("category " + req.body.name + " was created!!!");
    };

  this.getManCategories = function(req, res, next) {
        res.send("get all products for man");
    };

  this.getManCategory = function(req, res, next) {
        res.send("get " + req.params.name + " category");
    };

  this.updateManCategory = function(req, res, next) {
        res.send("category " + req.body.name + " was updated");
    };

  this.deleteManCategory = function(req, res, next) {
        res.send("category " + req.params.name + " was deleted!!!");
    }
};
