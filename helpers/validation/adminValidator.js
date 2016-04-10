var validator = require('./validator');

module.exports = function () {

    this.isValidDataForCreateAdmin = function (req, res, next) {
        console.log("isValidDataForCreateAdmin   start");
        var body = req.body || {};
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var phoneNumber = body.phoneNumber;
        var age = body.age;
console.log(login, password, firstName, lastName, phoneNumber);

        var wrongData = {};

        if (!validator.isAlphaNumeric(login)) {
            wrongData.login = login;
        }
        ;

        if (!validator.isAlphaNumeric(password)) {
            wrongData.password = password;
        }
        ;
        if (!validator.isAlpha(firstName)) {
            wrongData.firstName = firstName;
        }
        ;
        if (!validator.isAlpha(lastName)) {
            wrongData.lastName = lastName;
        }
        ;

        if (!validator.isNumeric(age)) {
            wrongData.age = age;
        }
        ;

        if (!validator.isNumeric(phoneNumber)) {
            wrongData.phoneNumber = phoneNumber;
        }
        ;
        console.log(Object.keys(wrongData).length);
        if (Object.keys(wrongData).length) {
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }
    this.isValidDataForUpdateAdmin = function (req, res, next) {

        var body = req.body || {};
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var phoneNumber = body.phoneNumber;
        var age = body.age;

        var wrongData = {};

        if (login && !validator.isAlphaNumeric(login)) {
            wrongData.login = login;
        }
        ;
        if (password && !validator.isAlphaNumeric(password)) {
            wrongData.password = password;
        }
        ;
        if (firstName && !validator.isAlpha(firstName)) {
            wrongData.firstName = firstName;
        }
        ;
        if (lastName && !validator.isAlpha(lastName)) {
            wrongData.lastName = lastName;
        }
        ;
        if (age && !validator.isNumeric(age)) {
            wrongData.age = age;
        }
        ;
        if (phoneNumber && !validator.isNumeric(phoneNumber)) {
            wrongData.phoneNumber = phoneNumber;
        }
        ;

        if (Object.keys(wrongData).length) {
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }
};
