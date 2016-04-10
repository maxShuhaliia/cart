var validator = require('./validator');

module.exports = function () {

    this.isValidDataForCreateBrand = function (req, res, next) {

        var body = req.body || {};

        var name = body.name;
        var description = body.description;
        var manufacturer = body.manufacturer;


        var wrongData = {};

        if (!validator.isAlphaNumeric(name)) {
            wrongData.name = name;
        }

        if (!validator.isAlpha(description)) {
            wrongData.description = description;
        }

        if (!validator.isAlpha(manufacturer)) {
            wrongData.manufacturer = manufacturer;
        }

        if (Object.keys(wrongData).length) {
//console.log("from create wrong data");
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }

    this.isValidDataForUpdateBrand = function (req, res, next) {

        var body = req.body || {};

        var name = body.name;
        var description = body.description;
        var manufacturer = body.manufacturer;

        var wrongData = {};

        if (name && !validator.isAlphaNumeric(name)) {
            wrongData.name = name;
        }

        if (description && !validator.isAlpha(description)) {
            wrongData.description = description;
        }

        if (manufacturer && !validator.isAlpha(manufacturer)) {
            wrongData.manufacturer = manufacturer;
        }

        if (Object.keys(wrongData).length) {
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }
};
/*
 var user = users.at(1);
 user.save();
 */