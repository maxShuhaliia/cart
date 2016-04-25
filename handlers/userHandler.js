var UserModel = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');

function getAggregateUserComments() {
    var aggregateArray = [];
    aggregateArray.push({
        $unwind: {
            path                      : '$comments',
            preserveNullAndEmptyArrays: true
        }
    });
    aggregateArray.push({
        $lookup: {
            from        : 'comments',
            localField  : 'comments',
            foreignField: '_id',
            as          : 'comments'
        }
    });
    aggregateArray.push({
        $project: {
            login      : 1,
            password   : 1,
            pathToPhoto: 1,
            firstName  : 1,
            lastName   : 1,
            age        : 1,
            phoneNumber: 1,
            email      : 1,
            lastVisit  : 1,
            isAdmin    : 1,
            isBan      : 1,
            orders     : 1,
            cart       : 1,
            comments   : {$arrayElemAt: ['$comments', 0]}
        }
    });
    aggregateArray.push({
        $group: {
            _id     : {
                _id        : '$_id',
                login      : '$login',
                password   : '$password',
                pathToPhoto: '$pathToPhoto',
                firstName  : '$firstName',
                lastName   : '$lastName',
                age        : '$age',
                phoneNumber: '$phoneNumber',
                email      : '$email',
                lastVisit  : '$lastVisit',
                isAdmin    : '$isAdmin',
                isBan      : '$isBan',
                orders     : '$orders',
                cart       : '$cart',
            },
            comments: {
                $push: {
                    _id    : "$comments._id",
                    author : "$comments.author",
                    message: "$comments.message",
                    target : "$comments.target"
                }
            }
        }
    });

    aggregateArray.push({
        $project: {
            //_id: "$_id._id",
            //login: '$_id.login',
            //firstName: "$_id.firstName",
            //lastName: "$_id.lastName",
            //login: "$_id.login",
            //age: "$_id.age",
            //comments: 1
            _id        : '$_id._id',
            login      : '$_id.login',
            password   : '$_id.password',
            pathToPhoto: '$_id.pathToPhoto',
            firstName  : '$_id.firstName',
            lastName   : '$_id.lastName',
            age        : '$_id.age',
            phoneNumber: '$_id.phoneNumber',
            email      : '$_id.email',
            lastVisit  : '$_id.lastVisit',
            isAdmin    : '$_id.isAdmin',
            isBan      : '$_id.isBan',
            orders     : '$_id.orders',
            cart       : '$_id.cart',
            comments   : 1
        }
    });
    return aggregateArray;
}

module.exports = function () {


    this.login = function (req, res, next) {
        var body = req.body;

        UserModel
            .findOne({email: email})
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }

                if (user.password =  UserModel.methods.generateHash(body.password) ) {
                    user.password = "";
                    req.session.userId = user._id;
                    req.session.email = user.email;
                    res.status(200).send(user);
                } else {
                    res.status(200).send({fail: 'wrong password'});
                }
            });
    };

    this.register = function (req, res, next) {
        var body = req.body;


        UserModel
            .save(body)
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).send({
                    success: "user registered"
                });
            });
    };

    this.createUser = function (req, res, next) {
        req.body.password = UserModel.schema.methods.generateHash(req.body.password).toString();
        var userModel = new UserModel(req.body);

        userModel.save(function (err, data) {
            if (err) {
                console.log(err);

                return res.send(err);
            }
            return res.send(data);
        });
    };

    this.getUsers = function (req, res, next) {

        var query = req.query;
        var expand = query.expand;
        var expandedBy;
        var aggregateArray = [];
        var queryToDB;
        var page = query.page;
        var limit = query.limit;
        var sort = query.sort;
        var kindOfSort = +query.kind;
        var skip = page === 1 ? 0 : ((page - 1) * limit);

        if (expand && !(expand instanceof Array)) {
            expand = [expand];
        }

        if (expand) {
            for (var i = 0; i <= expand.length - 1; i++) {
                expandedBy = expand[i];
                if (expandedBy === 'comments') {
                    aggregateArray = getAggregateUserComments();
                }
            }
            if (sort && kindOfSort) {
                var obj = {};
                obj[sort] = kindOfSort;
                aggregateArray.push({
                    $sort: obj
                });
            }
            ;
            if (skip) {
                aggregateArray.push({
                    $skip: +skip
                });
            }
            if (limit) {
                aggregateArray.push({
                    $limit: +limit
                });
            }
            queryToDB = UserModel.aggregate(aggregateArray);
            queryToDB.exec(function (err, users) {
                if (err) {

                    return next(err);
                }
                res.status(200).send(users);
            });
        } else {
            UserModel.find({}, {
                _id        : 1,
                login      : 1,
                password   : 1,
                pathToPhoto: 1,
                firstName  : 1,
                lastName   : 1,
                age        : 1,
                phoneNumber: 1,
                email      : 1,
                lastVisit  : 1,
                isAdmin    : 1,
                isBan      : 1,
                orders     : 1,
                cart       : 1,
                comments   : 1
            }, function (err, users) {
                if (err) {

                    return next(err);
                }

                return res.send(users);
            })
        }
    };

    this.getUserById = function (req, res, next) {

        UserModel
            .find({_id: req.params.id}, {__v: 0},
                function (err, user) {
                    if (err) {

                        return next(err);
                    }

                    return res.send(user);
                });
    };

    this.getUserByIdWithComments = function (req, res, next) {

        var aggregateArray = getAggregateUserComments();
        aggregateArray.unshift({
            $match: {_id: ObjectId(req.params.id)}
        });
        var queryToDB = UserModel.aggregate(aggregateArray);
        queryToDB.exec(function (err, user) {
            if (err) {

                return next(err);
            }

            return res.status(200).send(user);
        });
    };

    this.updateUserById = function (req, res, next) {

        var id = req.params.id;
        var body = req.body;
        var user = {};
        var keys = Object.keys(body);
        keys.forEach(function (item, i, keys) {
            user[item] = body[item];
        });

        UserModel.findByIdAndUpdate(id, user, {new: true}, function (err, user) {
            if (err) {
                console.log(err);

                return next(err);
            }

            return res.status(200).send(user);
        });
    };

    this.deleteUserById = function (req, res, next) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                console.log(err);

                return next(err);
            }
            if (user.pathToPhoto !== "./images/users/default.jpg") {
                var pathToFile = __dirname.split("\\").slice(0, -1).join("/") +
                    "/public" + user.pathToPhoto.slice(1);

                fs.unlink(pathToFile, function (err) {
                    if (err) {
                        console.log(err);

                        return next(err);
                    }
                });
            }
            return res.status(200).send(user);
        });
    };
};