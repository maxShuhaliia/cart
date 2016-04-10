var validator = require('./validator');

module.exports = function () {

    this.isValidDataForCreateComment = function (req, res, next) {

        var body = req.body || {};

        var message = body.message;
        var target = body.target;
        var author = body.author;


        var wrongData = {};

        if (!validator.isAlphaNumeric(message) && message.length < 200) {
            wrongData.message = message;
        }

        if (!validator.isAlphaNumeric(target)) {
            wrongData.target = target;
        }

        if (!validator.isAlphaNumeric(author)) {
            wrongData.author = author;
        }

        if (Object.keys(wrongData).length) {
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }

    this.isValidDataForUpdateComment = function (req, res, next) {

        var body = req.body || {};

        var message = body.message;
        var target = body.target;
        var author = body.author;


        var wrongData = {};

        if (message && !validator.isAlphaNumeric(message) && message.length < 200) {
            wrongData.message = message;
        }

        if (target && !validator.isAlphaNumeric(target)) {
            wrongData.target = target;
        }

        if (author && !validator.isAlphaNumeric(author)) {
            wrongData.author = author;
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