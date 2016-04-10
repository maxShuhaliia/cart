var UserModel = require('../../models/user');
var twilio = require('twilio');
var randomStrings = require('random-strings');

module.exports = function () {


    this.findUser = function (req, res, next) {
        if (req.session.code) {
            if (req.session.code === req.body.code) {
                delete req.session.code;
                return next();
            } else
                return res.send("wrong code")
        } else {
            UserModel.findOne({login: req.body.email}, function (err, user) {
                if (user.validPassword(req.body.password)) {

                    var client = new twilio.RestClient('ACcd6870c7ad09ddb0badb8db68c385d23', '45f87fe77ddd4aef3feebd070da5434e');
                    var code = randomStrings.numeric(4);

                    client.sms.messages.create({
                        to: '+380631038657',
                        from: '+12017629436',
                        body: code
                    }, function (error, message) {
                        if (!error) {
                            console.log(message.sid);

                            console.log('Message sent on:');
                            console.log(message.dateCreated);
                            req.session.code = code;
                            return res.send("code");
                        } else {

                            console.log('Oops! There was an error.');
                            console.log(error);
                        }
                    });
                }else{
                    return res.send("user not found");
                }
            });
        };
    }
};