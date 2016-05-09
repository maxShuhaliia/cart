var ProductModel = require('../models/product');
var ObjectId = require('mongodb').ObjectID;
var BrandModel = require('../models/brand');
var fs = require('fs');


function getAggregateProductComments() {

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
            name       : 1,
            pathToPhoto: 1,
            brandName  : 1,
            price      : 1,
            description: 1,
            topNotes   : 1,
            heartNotes : 1,
            baseNotes  : 1,
            launchDate : 1,
            category   : 1,
            brandId    : 1,
            gender     : 1,
            soldItems  : 1,
            comments   : {$arrayElemAt: ['$comments', 0]}
        }
    });

    aggregateArray.push({
        $group: {
            _id     : {
                _id        : '$_id',
                name       : '$name',
                pathToPhoto: '$pathToPhoto',
                brandName  : "$brandName",
                price      : "$price",
                description: "$description",
                topNotes   : "$topNotes",
                heartNotes : "$heartNotes",
                baseNotes  : "$baseNotes",
                launchDate : "$launchDate",
                category   : "$category",
                brandId    : "$brandId",
                gender     : "$gender",
                soldItems  : "$soldItems"
            },
            comments: {
                $push: {
                    _id    : "$comments._id",
                    author : "$comments.author",
                    message: "$comments.message"
                }
            }
        }
    });

    aggregateArray.push({
        $project: {
            _id        : "$_id._id",
            name       : "$_id.name",
            pathToPhoto: "$_id.pathToPhoto",
            brandName  : "$_id.brandName",
            price      : "$_id.price",
            description: "$_id.description",
            topNotes   : "$_id.topNotes",
            heartNotes : "$_id.heartNotes",
            baseNotes  : "$_id.baseNotes",
            launchDate : "$_id.launchDate",
            category   : "$_id.category",
            brandId    : "$_id.brandId",
            gender     : "$_id.gender",
            soldItems  : "$_id.soldItems",
            comments   : 1
        }
    });

    return aggregateArray;
};

module.exports = function () {

    this.createProduct = function (req, res, next) {
        req.body.brandId = ObjectId(req.body.brandId);
        var productModel = new ProductModel(req.body);

        productModel.save(function (err, product) {
            if (err) {
                console.log(err);
                return next(err);
            }

            BrandModel.update({_id: product.brandId},
                {$push: {products: product._id}}, function (err, data) {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                });
            return res.status(200).send(product);

        })
    };

    this.getProducts = function (req, res, next) {

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
        var brandId = query.brandId;


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
            if (brandId) {
                aggregateArray.unshift({
                    $match: {brandId: ObjectId(brandId)}
                });
            }
            ;


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
            queryToDB = ProductModel.aggregate(aggregateArray);
            queryToDB.exec(function (err, product) {
                if (err) {

                    return next(err);
                }

                return res.status(200).send(product);
            });
        } else {
            ProductModel.find({}, {
                _id        : 1,
                name       : 1,
                pathToPhoto: 1,
                brandName  : 1,
                price      : 1,
                description: 1,
                topNotes   : 1,
                heartNotes : 1,
                baseNotes  : 1,
                launchDate : 1,
                category   : 1,
                brandId    : 1,
                gender     : 1,
                soldItems  : 1,
                comments   : 1
            }, function (err, product) {
                if (err) {

                    return next(err);
                }

                return res.send(product);
            })
        }
    };

    this.getRandomProducts = function (req, res, next) {

        ProductModel.findRandom().limit(10).exec(function (err, products) {
            if(err){
                console.log(err);
            }

            res.status(200).send(products);
        });
    };

    this.getCategoryProducts = function (req, res, next) {
        var query = req.query;
        var category = (query.category && query.category !== '0') ? query.category : '';
        var gender = req.params.gender && req.params.gender !== '0' ? req.params.gender : '';

        var page = query.page;
        var limit = query.limit;
        var sort = query.sort;
        var kindOfSort = +query.kind;
        var queryToDB;
        var skip = page === 1 ? 0 : ((page - 1) * limit);

        var aggregateArray = getAggregateProductComments();

        if (gender) {
            aggregateArray.unshift({
                $match: {gender: gender}
            });
        };
        if (category && (category === 'luxury' || category === 'sport' || category === 'classic')) {
            aggregateArray.unshift({
                $match: {category: category}
            });
        }
        if (sort && kindOfSort) {
            var obj = {};
            obj[sort] = kindOfSort;
            aggregateArray.push({
                $sort: obj
            });
        };
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

            return res.status(200).send(product);
        });
    };

    this.getProductsByBrandId = function (req, res, next) {
        var query = req.query;
        var limit = query.limit;
        var skip = query.page * limit;
        var aggregateArray = [];

        aggregateArray.push({
            $match: {brandId: req.params.id}
        });
        if (skip) {
            aggregateArray.push({
                $skip: +skip
            });
        }
        if (limit) {
            $limit: +limit
        }
        var queryToDB = ProductModel.aggregate(aggregateArray);
        queryToDB.exec(function (err, product) {
            if (err) {

                return next(err);
            }

            return res.status(200).send(product);
        });
    };

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

            return res.status(200).send(product);
        });
    };

    this.updateProductById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        var product = {};
        var keys = Object.keys(body);
        keys.forEach(function (item, i, keys) {
            if (item !== 'comments') {
                product[item] = body[item];
            }
        });
        ProductModel.findByIdAndUpdate(id, product, {new: true}, function (err, product) {
            if (err) {
                console.log(err);

                return next(err);
            }
            ;

            return res.status(200).send(product);
        });
    };

    this.deleteProductById = function (req, res, next) {
        var id = req.params.id;
        ProductModel.findByIdAndRemove(id, function (err, product) {
            if (err) {

                return next(err);
            }
            if (product.pathToPhoto !== "./images/products/default.jpg") {
                var pathToFile = __dirname.split("\\").slice(0, -1).join("/") +
                    "/public" + product.pathToPhoto.slice(1);

                fs.unlink(pathToFile, function (err) {
                    if (err) {
                        console.log(err);

                        return next(err);
                    }
                });
            }
            return res.status(200).send(product);
        });
    }
};