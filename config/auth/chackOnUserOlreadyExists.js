var UserModel = require('../../models/user');

module.exports = function () {

    this.isExixts = function (req, res, next) {
        console.log("from user is already exists ");

        UserModel.findOne({login: req.body.login}, function (err, user) {
            if(!user){
                next();
            }else{
                return res.send('user already exists');
            }
        });
    }
    ;
}
