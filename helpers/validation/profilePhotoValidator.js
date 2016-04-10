var validator = require('./validator');
var mime = require('mime');
var http = require('http');

module.exports = function () {

    this.isValidDataForCreatePhoto= function (req, res, next) {
    //    console.dir(req);
//
//        var wrongData = {};
//
//        if (!validator.isAlphaNumeric(name)) {
//            wrongData.name = name;
//        }
//
//        if (!validator.isAlpha(description)) {
//            wrongData.description = description;
//        }
//
//        if (!validator.isAlpha(manufacturer)) {
//            wrongData.manufacturer = manufacturer;
//        }
//
//        if (Object.keys(wrongData).length) {
////console.log("from create wrong data");
//            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
//        } else {
//            next();
//        }
        next();
    }

    this.isValidDataForUpdatePhoto = function (req, res, next) {

        //var body = req.body || {};
        //
        //var name = body.name;
        //var description = body.description;
        //var manufacturer = body.manufacturer;
        //
        //var wrongData = {};
        //
        //if (name && !validator.isAlphaNumeric(name)) {
        //    wrongData.name = name;
        //}
        //
        //if (description && !validator.isAlpha(description)) {
        //    wrongData.description = description;
        //}
        //
        //if (manufacturer && !validator.isAlpha(manufacturer)) {
        //    wrongData.manufacturer = manufacturer;
        //}
        //
        //if (Object.keys(wrongData).length) {
        //    res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        //} else {
        //    next();
        //}
        next();
    }
};