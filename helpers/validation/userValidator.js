var userModel = require('../../models/user')
var validator = require('./validator');

module.exports = function () {

    this.isValidDataForCreateUser = function (req, res, next) {

        var body = req.body || {};
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var age = body.age;
        // var lastVisit = body.lastVisit;
        var phoneNumber = body.phoneNumber;
        var email = body.email;

        var wrongData = {};


        if (!validator.isAlphaNumeric(login)) {
            wrongData.login = login;
        }

        if (!validator.isAlpha(firstName)) {
            wrongData.firstName = firstName;
        }

        if (!validator.isAlpha(lastName)) {
            wrongData.lastName = lastName;
        }

        if (!validator.isNumeric(phoneNumber)) {
            wrongData.phoneNumber = phoneNumber;
        }

        if (!parseInt(age) || (12 < age && age < 100)) {
            wrongData.age = age;
        }

        if (Object.keys(wrongData).length) {
            console.log("from create wrong data");
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }

    this.isValidDataForUpdateUser = function (req, res, next) {

        var body = req.body || {};
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var age = body.age;
        // var lastVisit = body.lastVisit;
        var phoneNumber = body.phoneNumber;
        var email = body.email;

        var wrongData = {};

        if (login && !validator.isAlphaNumeric(login)) {
            wrongData.login = login;
        }

        if (firstName && !validator.isAlpha(firstName)) {
            wrongData.firstName = firstName;
        }

        if (lastName && !validator.isAlpha(lastName)) {
            wrongData.lastName = lastName;
        }

        if (phoneNumber && !validator.isNumeric(phoneNumber)) {
            wrongData.phoneNumber = phoneNumber;
        }

        if (age && !parseInt(age) || !(12 < age && age < 100)) {
            wrongData.age = age;
        }

        if (Object.keys(wrongData).length) {
            console.log("from update wrong data");
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