var BrandModel = require('../models/brand');

module.exports = function () {

    this.createBrand = function (req, res, next) {

        var brandModel = new BrandModel(req.body);
        brandModel.save(function (err, data) {
            if (err) {

                return next(err);
            }
            res.send(data);
        });
    };

    this.getBrands = function (req, res, next) {

       // console.dir(req.session);
        BrandModel.find({}, function (err, data) {
            res.send(data);
        });
    }

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