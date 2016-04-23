var AdminModel = require('../models/admin');

function getAggregateAdminComments() {
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
            comments: {$arrayElemAt: ['$comments', 0]}
        }
    });
    aggregateArray.push({
        $group: {
            _id: {
                _id: '$_id',
                firstName: '$firstName',
                lastName: '$lastName',
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
            comments: 1
        }
    });

    return aggregateArray;
}

module.exports = function () {

    this.createAdmin = function (req, res, next) {
        var adminModel = new AdminModel(req.body);
        adminModel.save(function (err, admin) {
            if (err) {

                return next(err);
            }

            return res.send(admin);
        });
    };

    this.getAdmins = function (req, res, next) {
        var query = req.query;
        var expand = query.expand;
        var expandedBy;
        var aggregateArray = [];
        var queryToDB;
        var skip = query.skip;
        var limit = query.limit;

        if (expand && !(expand instanceof Array)) {
            expand = [expand];
        };
        if (expand) {
            for (var i = 0; i <= expand.length - 1; i++) {
                expandedBy = expand[i];
                if (expandedBy === 'comments') {
                    aggregateArray = getAggregateAdminComments();
                };
            };
            if (skip) {
                aggregateArray.push({
                    $skip: +skip
                });
            };
            if (limit) {
                aggregateArray.push({
                    $limit: +limit
                });
            };
            queryToDB = AdminModel.aggregate(aggregateArray);
            queryToDB.exec(function (err, admins) {
                if (err) {

                    return next(err);
                }

                return res.status(200).send(admins);
            });
        } else {
            AdminModel.find({}, {
                _id: 1,
                firstName: 1,
                lastName: 1,
                login: 1,
                comments: 1
            }, function (err, admins) {
                if (err) {

                    return next(err);
                }

                return res.send(admins);
            });
        };
    };

    this.getAdminById = function (req, res, next) {

        AdminModel.find({_id: req.params.id}, {__v: 0, password: 0},
                function (err, admin) {
                    if (err) {

                        return next(err);
                    };

                    return res.send(admin);
                });
    };

    this.updateAdminById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        var admin = {};
        var keys = Object.keys(body);
        keys.forEach(function (item, i, keys) {
            admin[item] = body[item];
        });

        AdminModel.findByIdAndUpdate(id, admin, {new: true}, function (err, admin) {
            if (err) {

                return next(err);
            };

            return res.status(200).send(admin);
        });
    };

    this.deleteAdminById = function (req, res, next) {
        var id = req.params.id;
        AdminModel.findByIdAndRemove(id, function (err, admin) {
            if (err) {

                return next(err);
            }

            return res.status(200).send(admin);
        });
    };
};

