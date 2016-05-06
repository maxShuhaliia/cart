var CommentModel = require('../models/comment');
var ProductModel = require('../models/product');
var UserModel = require('../models/user');
//var validator = require('validator');

module.exports = function() {

    this.createComment = function(req, res, next) {
        var commentModel = new CommentModel(req.body);
        commentModel.save(function (err, comment) {
            if (err) {
                return next(err);
            }
            //now i add comment to convenient product
            ProductModel.findByIdAndUpdate(comment.target, {$push : {comments: comment._id} }, {new: true}, function (err, product) {
                if (err) {
                    return next(err);
                };
            });
            // add comment to user
            UserModel.findByIdAndUpdate(comment.author, {$push : {comments: comment._id} }, {new: true}, function (err, user) {
                if (err) {
                    return next(err);
                };
            });
            //return comment to client
             res.status(200).send(comment);
        });
    }

    this.getCommentsByProductId = function(req, res, next) {

        CommentModel
            .find({}, {__v: 0},
                function (err, comments) {
                    if (err) {

                        return next(err);
                    }
                    res.send(comments);
                });
    }

    this.updateCommentById = function(req, res, next) {
        var comment = {};
        var body = req.body;
        var id = req.params.id;
        var keys = Object.keys(body);

        keys.forEach(function (item, i, keys) {
            comment[item] = body[item];
        });

        CommentModel.findByIdAndUpdate(id, comment, {new: true}, function (err, comment) {
            if (err) {

                return next(err);
            }
            res.status(200).send(comment);
        });
    }

    this.deleteCommentById = function(req, res, next) {
        var id = req.params.id;
        console.log(id);
        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {

                return next(err);
            }
            res.status(200).send(comment);
        });
    };
}
