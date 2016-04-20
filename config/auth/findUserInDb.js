var UserModel = require('../../models/user');
var twilio = require('twilio');
var randomStrings = require('random-strings');

module.exports = function () {


    this.findUser = function (req, res, next) {
        console.log("1");
        console.log("req.session.code  " + req.session.code);
        console.log("req.body.code  " + req.body.code);

        if (req.session.code) {
            console.log("2");
            if (req.session.code === req.body.code) {
                console.log("3");
               // delete req.session.code;
                return next();
            } else
                console.log("4");
                return res.send("wrong code")
        } else {
            console.log("5");
            UserModel.findOne({login: req.body.email}, function (err, user) {
                if (user && user.validPassword(req.body.password)) {
                    console.log("6");
                    var client = new twilio.RestClient('ACcd6870c7ad09ddb0badb8db68c385d23', '45f87fe77ddd4aef3feebd070da5434e');
                    var code = randomStrings.numeric(4);

                    client.sms.messages.create({
                        to: '+380631038657',
                        from: '+12017629436',
                        body: code
                    }, function (error, message) {
                        if (!error) {
                            console.log(message.sid);
                            console.log("7");

                            console.log('Message sent on:');
                            console.log(message.dateCreated);
                            req.session.code = code;
                            return res.send("code");
                        } else {
                            console.log("8");
                            console.log('Oops! There was an error.');
                            console.log(error);
                        }
                        console.log("9");
                    });
                }else{
                    console.log("10");
                    return res.send("user not found");
                }
            });
        };
    }
};