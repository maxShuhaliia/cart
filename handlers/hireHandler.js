
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
          return res.status(500).send(err);
        }else{
           return res.status(200).send({messageStatus: 'Was delivered'});
        }
    });
};

function sendMessageOnMail(BodyMessage, res){

};

module.exports = function() {

    this.hire = function(req, res, next) {
        var body = req.body;
        var name = body.name;
        var companyName = body.companyName;
        var replyEmail = body.replyEmail;
        var message = body.message;
        var messageToMe = name + " from company '" + companyName + "'with contacts '"  + replyEmail + "' wanna hire me!!!" +
                "his message: '" + message + "'";
       // sendMessageOnPhone(messageToMe, res);
    }
};