module.exports = function () {

    this.forAdmin = function (req, res, next) {
        if(req.session && req.session.isAdmin ){
            return next();
        }

        console.log('req.session.isAdmin ', req.session.isAdmin);

        res.status(401).send();
    };

    this.forAuthUsers= function (req, res, next) {
        if(req.session && req.session.userId){
            return next();
        }

        res.status(401).send();
    };

    this.forAll = function (req, res, next) {

       return next();
    };
}


