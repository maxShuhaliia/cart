var BrandModel = require('../models/brand');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

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
/////////////////////////////////////////////////////////////////
//    aggregateArray.push({
//        $project: {
//            _id                  : '$products._id',
//            pathToPhotoForProduct: '$products.pathToPhotoForProduct',
//            brandName            : '$products.brandName',
//            price                : '$products.price',
//            description          : '$products.description',
//            topNotes             : '$products.topNotes',
//            heartNotes           : '$products.heartNotes',
//            baseNotes            : '$products.baseNotes',
//            launchDate           : '$products.launchDate',
//            category             : '$products.category'
//        }
//    });
//
//    aggregateArray.push({
//        $group: {
//            _id: {
//                _id                  : '$_id',
//                pathToPhotoForProduct: '$pathToPhotoForProduct',
//                brandName            : '$brandName',
//                price                : '$price',
//                description          : '$description',
//                topNotes             : '$topNotes',
//                heartNotes           : '$heartNotes',
//                baseNotes            : '$baseNotes',
//                launchDate           : '$launchDate',
//                category             : '$category'
//            },
//        }
//    });
//
//    aggregateArray.push({
//        $project: {
//            _id: "$_id._id",
//            pathToPhotoForProduct: '$_id.pathToPhotoForProduct',
//            brandName            : '$_id.brandName',
//            price                : '$_id.price',
//            description          : '$_id.description',
//            topNotes             : '$_id.topNotes',
//            heartNotes           : '$_id.heartNotes',
//            baseNotes            : '$_id.baseNotes',
//            launchDate           : '$_id.launchDate',
//            category             : '$_id.category',
//        }
//    });

 ///////////////////////////////////////////////////////////////////////////

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
            res.send(data);
        });
    };

    this.getBrands = function (req, res, next) {
        BrandModel.find({}, function (err, data) {
            res.send(data);
        });
    };
    this.getBrandById = function(req, res, next) {
        BrandModel.find({_id: req.params.id }, function (err, data) {

            res.send(data);
        });
    }


/////////////////////////////////////////////////////////////////////    realizing now
    this.getProductsByBrandId = function (req, res, next) {

        var query = req.query;
        var limit = query.limit;
        var skip = query.page * limit;


        var aggregateArray = getAggregateBrandProducts();
        aggregateArray.unshift({
            $match: {_id: ObjectId(req.params.id) }
        });

        //if (skip) {
        //    aggregateArray.push({
        //        $skip: +skip
        //    });
        //}
        //if (limit) {
        //    aggregateArray.push({
        //        $limit: +limit
        //    });
        //}

        var queryToDB = BrandModel.aggregate(aggregateArray);
        queryToDB.exec(function (err, brand) {

            if (err) {
                console.log("err brands.getProductsByBrandId: " + err);
                return next(err);
            }

            console.log("from brandHandler/");
         //   res.status(200).send(brand);
          res.status(200).send(brand[0].products);
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

                return next(err);
            }
            return res.status(200).send(brand);
        });
    }

    this.deleteBrand = function (req, res, next) {
        var id = req.params.id;
        BrandModel.findByIdAndRemove(id, function (err, brand) {
            if (err) {

                return next(err);
            }
            res.status(200).send(brand);
        });
    }
};