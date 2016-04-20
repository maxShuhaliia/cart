var UserModel = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

function getAggregateUserComments() {
    var aggregateArray = [];
    aggregateArray.push({
        $unwind: {
            path: '$comments',
            preserveNullAndEmptyArrays: true
        }
    });
    aggregateArray.push({
        $lookup: {
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            as: 'comments'
        }
    });
    aggregateArray.push({
        $project: {
            login: 1,
            firstName: 1,
            lastName: 1,
            age: 1,
            comments: {$arrayElemAt: ['$comments', 0]}
        }
    });
    aggregateArray.push({
        $group: {
            _id: {
                _id: '$_id',
                firstName: '$firstName',
                lastName: '$lastName',
                login: "$login",
                age: "$age"
            },
            comments: {
                $push: {
                    _id: "$comments._id",
                    author: "$comments.author",
                    message: "$comments.message",
                    target: "$comments.target"
                }
            }
        }
    });

    aggregateArray.push({
        $project: {
            _id: "$_id._id",
            firstName: "$_id.firstName",
            lastName: "$_id.lastName",
            login: "$_id.login",
            age: "$_id.age",
            comments: 1
        }
    });
    return aggregateArray;
}

module.exports = function () {

    this.createUser = function (req, res, next) {
        req.body.password = UserModel.schema.methods.generateHash( req.body.password).toString();
        var userModel = new UserModel(req.body);

        userModel.save(function (err, data) {
            if (err) {
              return  res.send(err);
            }
            data.password = "";
            res.redirect('/login');
        });
    };

    this.getUsers = function (req, res, next) {

        var query = req.query;
        var expand = query.expand;
        var expandedBy;
        var aggregateArray = [];
        var queryToDB;
        var skip = query.skip;
        var limit = query.limit;   // quantity

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
                _id: 1,
                firstName: 1,
                lastName: 1,
                login: 1,
                age: 1,
                comments: 1
            }, function (err, users) {
                if (err) {
                    return next(err);
                }
                res.send(users);
            })
        }
    };

    this.getUserById = function (req, res, next) {

        UserModel
            .find({_id: req.params.id}, {__v: 0, password: 0},
                function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    res.send(user);
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
            res.status(200).send(user);
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
            user.password = "";

            res.status(200).send(user);
        });
    };
    this.deleteUserById = function (req, res, next) {

        var id = req.params.id;
        console.log(id);
        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };
};