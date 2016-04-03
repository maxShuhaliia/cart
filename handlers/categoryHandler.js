var CategoryModel = require('../models/category');
var ObjectId = require('mongodb').ObjectID;

function getAggregateCategoryProducts() {
    var aggregateArray = [];
    aggregateArray.push({
        $unwind: {
            path: '$products',
            preserveNullAndEmptyArrays: true
        }
    });
    aggregateArray.push({
        $lookup: {
            from: 'products',
            localField: 'products',
            foreignField: '_id',
            as: 'products'
        }
    });
    aggregateArray.push({
        $project: {
            name: 1,
            gender: 1,
            products: {$arrayElemAt: ['$products', 0]}
        }
    });
    aggregateArray.push({
        $group: {
            _id: {
                _id: '$_id',
                name: '$name',
                gender: '$gender'
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
                    launchDate: "$products.launchDate",
                    category: "$products.category",
                    comments: "$products.comments"
                }
            }
        }
    });

    aggregateArray.push({
        $project: {
            _id: "$_id._id",
            name: "$_id.name",
            gender: "$_id.gender",
            products: 1
        }
    });
    return aggregateArray;
}

module.exports = function () {

    this.createCategory = function (req, res, next) {

        var categoryModel = new CategoryModel(req.body);
        categoryModel.save(function (err, data) {
            if (err) {

                return next(err);
            }
            res.send(data);
        });
    };

    this.getCtegoriesWithProducts = function (req, res, next) {

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
                if (expandedBy === 'products') {
                    console.log("from if");
                    aggregateArray = getAggregateCategoryProducts();
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
            queryToDB = CategoryModel.aggregate(aggregateArray);
            queryToDB.exec(function (err, categories) {
                if (err) {

                    return next(err);
                }
                res.status(200).send(categories);
            });
        } else {
            CategoryModel.find({}, {
                _id: 1,
                name: 1,
                gender: 1,
                products: 1
            }, function (err, categories) {
                if (err) {

                    return next(err);
                }
                res.send(categories);
            })
        }
    };

    this.getCategories = function (req, res, next) {

        CategoryModel
            .find({}, {__v: 0},
                function (err, category) {
                    if (err) {

                        return next(err);
                    }
                    res.send(category);
                });
    };

    this.updateCategoryById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        var category = {};
        var keys = Object.keys(body);

        keys.forEach(function (item, i, keys) {
            category[item] = body[item];
        });

        CategoryModel.findByIdAndUpdate(id, category, {new: true}, function (err, category) {
            if (err) {

                return next(err);
            }
            res.status(200).send(category);
        });
    };

    this.deleteCategoryById = function (req, res, next) {
        var id = req.params.id;

        CategoryModel.findByIdAndRemove(id, function (err, category) {
            if (err) {

                return next(err);
            }
            res.status(200).send(category);
        });
    }
};