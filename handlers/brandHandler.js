var BrandModel = require('../models/brand');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');

function getAggregateBrandProducts() {
    var aggregateArray = [];
    aggregateArray.push({
        $unwind: {
            path                      : '$products',
            preserveNullAndEmptyArrays: true
        }
    });
    aggregateArray.push({
        $lookup: {
            from        : 'products',
            localField  : 'products',
            foreignField: '_id',
            as          : 'products'
        }
    });
    aggregateArray.push({
        $project: {
            _id: 1,
            brandName: 1,
            description: 1,
            manufacturer: 1,
            pathToPhoto: 1,
            products: {$arrayElemAt: ['$products', 0]}
        }
    });
    aggregateArray.push({
            $group: {
                _id: {
                    _id: '$_id',
                    brandName: '$brandName',
                    description: '$description',
                    manufacturer: '$manufacturer',
                    pathToPhoto: '$pathToPhoto',
                },
                products: {
                    $push: {
                        _id: "$products._id",
                        name: "$products.name",
                        pathToPhotoForProduct: "$products.pathToPhotoForProduct",
                        brandName: "$products.brandName",
                        price: "$products.price",
                        description: "$products.description",
                        topNotes: "$products.topNotes",
                        heartNotes: "$products.heartNotes",
                        baseNotes: "$products.baseNotes",
                        launchDate: "$products.launchDate"
                    }
                }
        }
    });
    aggregateArray.push({
        $project: {
            _id: "$_id._id",
            brandName: "$_id.brandName",
            description: "$_id.description",
            manufacturer: "$_id.manufacturer",
            pathToPhoto: "$_id.pathToPhoto",
            products: 1
        }
    });

    return aggregateArray;
};

module.exports = function () {

    this.createBrand = function (req, res, next) {
        delete req.body.pathToPhoto;
        var brandModel = new BrandModel(req.body);
        brandModel.save(function (err, data) {
            if (err) {
                console.log(err);

                return next(err);
            }

           return res.send(data);
        });
    };

    this.getBrands = function (req, res, next) {
        var query = req.query;
        var expand = query.expand;
        var expandedBy;
        var aggregateArray = [];
        var queryToDB;
        var page = query.page;
        var limit = query.limit;
        var sort = query.sort;
        var kindOfSort = +query.kind;
        var skip = page === 1 ? 0 : ((page-1) * limit);

        if (expand && !(expand instanceof Array)) {
            expand = [expand];
        };
        if (expand) {
            for (var i = 0; i <= expand.length - 1; i++) {
                expandedBy = expand[i];
                if (expandedBy === 'products') {
                    aggregateArray = getAggregateBrandProducts();
                }
            };
            if(sort && kindOfSort) {
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
            };
            if (limit) {
                aggregateArray.push({
                    $limit: +limit
                });
            };
            queryToDB = BrandModel.aggregate(aggregateArray);
            queryToDB.exec(function (err, product) {
                if (err) {

                    return next(err);
                }

                return res.status(200).send(product);
            });
        } else {
            BrandModel.find({}, {
                _id: 1,
                brandName: 1,
                description: 1,
                manufacturer: 1,
                pathToPhoto: 1,
                comments: 1
            }, function (err, product) {
                if (err) {

                    return next(err);
                };

                return res.send(product);
            });
        };
   };

    this.getBrandById = function(req, res, next) {
        BrandModel.find({_id: req.params.id }, function (err, data) {

            return res.send(data);
        });
    };

    this.getProductsByBrandId = function (req, res, next) {
        var query = req.query;
        var limit = query.limit;
        var skip = query.page * limit;
        var aggregateArray = getAggregateBrandProducts();
        aggregateArray.unshift({
            $match: {_id: ObjectId(req.params.id) }
        });
        var queryToDB = BrandModel.aggregate(aggregateArray);
        queryToDB.exec(function (err, brand) {
            if (err) {
                console.log("err brands.getProductsByBrandId: " + err);
                return next(err);
            }

          return res.status(200).send(brand[0].products);
        });
    };

    this.updateBrand = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        var brand = {};
        var keys = Object.keys(body);
        keys.forEach(function (item, i, keys) {
            brand[item] = body[item];
        });

        BrandModel.findByIdAndUpdate(id, brand, {new: true}, function (err, brand) {
            if (err) {
                console.log(err);

                return next(err);
            }

            return res.status(200).send(brand);
        });
    };

    this.deleteBrand = function (req, res, next) {
        var id = req.params.id;
        BrandModel.findByIdAndRemove(id, function (err, brand) {
            if (err) {

                return next(err);
            };
            if(brand.pathToPhoto !== "./images/brands/default.jpg"){
                var pathToFile = __dirname.split("\\").slice(0, -1).join("/") +
                    "/public" + brand.pathToPhoto.slice(1);

                fs.unlink(pathToFile, function (err) {
                    if (err) {
                        console.log(err);

                        return next(err);
                    };
                });
            }

            return res.status(200).send(brand);
        });
    }
};