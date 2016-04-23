var userModel = require('../models/user');
var randomString = require('randomstring');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var ObjectId = require('mongodb').ObjectID;
var ProductModel = require('../models/product');
var BrandModel = require('../models/brand');
var UserModel = require('../models/user');


module.exports = function () {
    var self = this;
    this.setPhoto = function (req, res, next) {
        var item = req.params.item;
        var id = req.params.id;
        var type = mime.lookup(req.files.upload.path).split('/').pop();

        if (type === "jpeg" || type === "jpg" || type === 'png') {
            var extension = path.extname(req.files.upload.path);
            var fileName = randomString.generate(12);
            var pathToFile = __dirname.split("\\").slice(0, -1).join("/") +
                "/public/images/" + item + "/" + fileName + extension;

            fs.createReadStream(req.files.upload.path)
                .pipe(fs.createWriteStream(pathToFile).on('finish', function () {
                    fs.unlink(req.files.upload.path, function (err) {
                        if (err) {
                            console.log(err);

                            return next(err);
                        }
                    });
                    if(item === 'products'){
                        req.pathToItem = './images/products/' + fileName +  extension;
                        req.idItem = id;
                        self.updateProductPhoto(req, res, next);
                    }
                    else if(item === 'brands'){
                        req.pathToItem = './images/brands/' + fileName +  extension;
                        req.idItem = id;
                        self.updateBrandPhoto(req, res, next);
                    }
                    else if(item === 'users'){
                        req.pathToItem = './images/users/' + fileName +  extension;
                        req.idItem = id;
                        self.updateUserPhoto(req, res, next);
                    }
                }));
        } else {
            fs.unlink(req.files.upload.path, function (err) {
                if (err) {

                    return next(err);
                }
            });

            return res.send("not support type of photo!!! supported types: jpg, jpeg, png");
        }
    };

    this.getPhotoForUserId = function (req, res, next) {
        res.send("get all orders ");
    };
    this.updatePhotoForUserId = function (req, res, next) {
        res.send("get order for user whose id is " + req.params.id);
    };
    this.deletePhotoForUserId = function (req, res, next) {
        res.send("update order by id " + req.body.id);
    };

    this.updateProductPhoto = function(req, res, next){
        var product = {};
        product.pathToPhoto =  req.pathToItem;
        var id = req.idItem;
        req.idItem = null;
        req.pathToItem = null;

        ProductModel.findByIdAndUpdate(id, product, {new: true}, function (err, product) {
            if (err) {
                console.log(err);

                return next(err);
            }

            return res.send(product);
        });
    };

    this.updateUserPhoto = function(req, res, next) {
        var user = {};
        user.pathToPhoto =  req.pathToItem;
        var id = req.idItem;
        req.idItem = null;
        req.pathToItem = null;

        UserModel.findByIdAndUpdate(id, user, {new: true}, function (err, product) {
            if (err) {
                console.log(err);

                return next(err);
            }

            return res.send(product);
        });
    };

    this.updateBrandPhoto = function(req, res, next) {
        var brand = {};
        brand.pathToPhoto =  req.pathToItem;
        var id = req.idItem;
        req.idItem = null;
        req.pathToItem = null;

        BrandModel.findByIdAndUpdate(id, brand, {new: true}, function (err, product) {
            if (err) {
                console.log(err);

                return next(err);
            }

            return res.send(product);
        });
    };
};