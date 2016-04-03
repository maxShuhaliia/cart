var validator = require('validator');
var adminModel = require('../../models/admin')

module.exports = function() {

    this.isValidAdminData = function(req, res, next) {

        var body = req.body;
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var dataOfBirth = body.dataOfBirth;
        var phoneNumber = body.phoneNumber;


        var wrongData = {};

        if (!(validator.isAlphanumeric(login, 'en-US'))) {
            wrongData.login = login;
        };
        if (!(validator.isAlphanumeric(password))) {
            wrongData.password = password;
        };
        if (!(validator.isAlpha(firstName ))) {
            wrongData.firstName = firstName;
        };
        if (!(validator.isAlpha(lastName))) {
            wrongData.lastName = lastName;
        };
        if (!(validator.isDate(dataOfBirth))) {
            wrongData.age = age;
        };
        if (!(validator.isMobilePhone(phoneNumber))) {
            //at this period of development i am not sure about type of value number which i will be send....
            // that is why i will execute validation when i will elaborating front-end part application
        };

        if (Object.keys(wrongData).length) {
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        }else {
            next();
        }
    }
};

