var validator = require('./validator');

module.exports = function () {

    this.isValidDataForCreateCategory = function (req, res, next) {

        var body = req.body || {};

        var name = body.name;
        var gender = body.gender;

        var wrongData = {};

        if (!validator.isAlphaNumeric(name)) {
            wrongData.name = name;
        }

        if (!validator.isAlpha(gender)) {
            wrongData.firstName = firstName;
        }

        if (Object.keys(wrongData).length) {
            //console.log("from create wrong data");
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }

    this.isValidDataForUpdateCategory  = function (req, res, next) {

        var body = req.body || {};

        var name = body.name;
        var gender = body.gender;

        var wrongData = {};

        if (name && !validator.isAlphaNumeric(name)) {
            wrongData.name = name;
        }

        if (gender && !validator.isAlpha(gender)) {
            wrongData.gender = gender;
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