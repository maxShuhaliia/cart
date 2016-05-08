var nodemailer = require('nodemailer');

function sendMessageOnPhone(BodyMessage, res){

    var accountSid = 'ACcd6870c7ad09ddb0badb8db68c385d23';
    var authToken = '45f87fe77ddd4aef3feebd070da5434e';

    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: "+380631038657",
        from: "+12017629436",
        body: BodyMessage
    }, function(err, message) {

        if(err){
            console.log(err);
          //return res.status(500).send(err);
        }else{
          // return res.status(200).send({messageStatus: 'Was delivered'});
        }
    });
};

function sendMessageOnMail(BodyMessage, replyEmail, res){

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'maxshuhaliia@gmail.com', // Your email id
            pass: 'unrealman111111' // Your password
        }
    });

    var mailOptions = {
        from: replyEmail,
        to: 'maxshuhaliia@gmail.com', // list of receivers
        subject: 'someone wanna hire me', // Subject line
        text: BodyMessage
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });



};

module.exports = function() {

    this.hire = function(req, res, next) {
        var body = req.body;
        var name = body.name;
        var companyName = body.companyName;
        var replyEmail = body.replyEmail;
        var message = body.message;
        var messageToMe = name + " from company '" + companyName + "' with contacts '"  + replyEmail + "' wanna hire me!!!" +
                "his message: '" + message + "'";
        sendMessageOnPhone(messageToMe, res);
        sendMessageOnMail(messageToMe, replyEmail, res);
    }
};