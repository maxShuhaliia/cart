var ProductModel = require('../models/product');
var ObjectId = require('mongodb').ObjectID;
var CategoryModel = require('../models/category');

function getAggregateProductComments() {

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
            name: 1,
            pathToPhotoForProduct: 1,
            brandName: 1,
            price: 1,
            description: 1,
            topNotes: 1,
            heartNotes: 1,
            baseNotes: 1,
            launchDate: 1,
            category: 1,
            comments: {$arrayElemAt: ['$comments', 0]}
        }
    });

    aggregateArray.push({
        $group: {
            _id: {
                _id: '$_id',
                name: '$name',
                pathToPhotoForProduct: '$pathToPhotoForProduct',
                brandName: "$brandName",
                price: "$price",
                description: "$description",
                topNotes: "$topNotes",
                heartNotes: "$heartNotes",
                baseNotes: "$baseNotes",
                launchDate: "$launchDate",
                category: "$category"
            },
            comments: {
                $push: {
                    _id: "$comments._id",
                    author: "$comments.author",
                    message: "$comments.message"
                }
            }
        }
    });

    aggregateArray.push({
        $project: {
            _id: "$_id._id",
            name: "$_id.name",
            pathToPhotoForProduct: "$_id.pathToPhotoForProduct",
            brandName: "$_id.brandName",
            price: "$_id.price",
            description: "$_id.description",
            topNotes: "$_id.topNotes",
            heartNotes: "$_id.heartNotes",
            baseNotes: "$_id.baseNotes",
            launchDate: "$_id.launchDate",
            category: "$_id.category",
            comments: 1
        }
    });

    return aggregateArray;
}

module.exports = function () {

    this.createProduct = function (req, res, next) {

        var productModel = new ProductModel(req.body);
        productModel.save(function (err, product) {
            if (err) {

                return next(err);
            }

            CategoryModel.update({name: product.category},
                {$push: {products: product._id}}, function (err, data) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send(product);
                });
        })
    }
    this.getProducts = function (req, res, next) {

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
                    aggregateArray = getAggregateProductComments();
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
            queryToDB = ProductModel.aggregate(aggregateArray);
            queryToDB.exec(function (err, product) {
                if (err) {

                    return next(err);
                }
                res.status(200).send(product);
            });
        } else {
            ProductModel.find({}, {
                _id: 1,
                name: 1,
                pathToPhotoForProduct: 1,
                brandName: 1,
                price: 1,
                description: 1,
                topNotes: 1,
                heartNotes: 1,
                baseNotes: 1,
                launchDate: 1,
                category: 1,
                comments: 1
            }, function (err, product) {
                if (err) {

                    return next(err);
                }
                res.send(product);
            })
        }
    }
    this.getProductByIdWithComments = function (req, res, next) {

        var aggregateArray = getAggregateProductComments();
        aggregateArray.unshift({
            $match: {_id: ObjectId(req.params.id)}
        });

        var queryToDB = ProductModel.aggregate(aggregateArray);
        queryToDB.exec(function (err, product) {
            if (err) {

                return next(err);
            }
            res.status(200).send(product);
        });
    }
    this.updateProductById = function (req, res, next) {

        var id = req.params.id;
        var body = req.body;
        var product = {};
        var keys = Object.keys(body);
        keys.forEach(function (item, i, keys) {
            product[item] = body[item];
        });

        ProductModel.findByIdAndUpdate(id, product, {new: true}, function (err, product) {
            if (err) {

                return next(err);
            }
            ;
            res.status(200).send(product);
        });
    }
    this.deleteProductById = function (req, res, next) {
        var id = req.params.id;
        ProductModel.findByIdAndRemove(id, function (err, product) {
            if (err) {

                return next(err);
            }
            res.status(200).send(product);
        });
    }
};