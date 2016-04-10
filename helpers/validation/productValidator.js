var validator = require('./validator');

module.exports = function () {

    this.isValidDataForCreateProduct= function (req, res, next) {

        var body = req.body || {};

        var name = body.name;
        var brandName = body.brandName;
        var price = body.price;
        var description = body.description;
        var topNotes = body.topNotes;
        var heartNotes = body.heartNotes;
        var baseNotes = body.baseNotes;
        var launchDate = body.launchDate;
        var category = body.category;
        var pathToPhotoForProduct = body.pathToPhotoForProduct;


        var wrongData = {};

        if (!validator.isAlphaNumeric(name)) {
            wrongData.name = name;
        }

        if (!validator.isAlphaNumeric(brandName)) {
            wrongData.brandName = brandName;
        }

        if (!validator.isNumeric(price)) {
            wrongData.price = price;
        }

        if ( description && (!validator.isAlpha(description) || description.length < 5 || description.length > 200) ) {
            wrongData.description = description;
        }
        if ( topNotes && (!validator.isAlpha(topNotes)|| topNotes.length > 50) ) {
            wrongData.topNotes = topNotes;
        }
        if ( heartNotes && (!validator.isAlpha(heartNotes)|| heartNotes.length > 50) ) {
            wrongData.heartNotes = heartNotes;
        }
        if (baseNotes && (!validator.isAlpha(baseNotes)|| baseNotes.length > 50)) {
            wrongData.baseNotes = baseNotes;
        }
        if (!validator.isAlpha(category) || category.length > 50) {
            wrongData.category = category;
        }
        if (!validator.isNumeric(launchDate) || launchDate > 2016) {
            wrongData.launchDate = launchDate;
        }
        if (!validator.isValidPath(pathToPhotoForProduct) && pathToPhotoForProduct.length < 200) {
            wrongData.pathToPhotoForProduct = pathToPhotoForProduct;
        }

        if (Object.keys(wrongData).length) {
//console.log("from create wrong data");
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }

    this.isValidDataForUpdateBrand = function (req, res, next) {

        var body = req.body || {};

        var name = body.name;
        var brandName = body.brandName;
        var price = body.price;
        var description = body.description;
        var topNotes = body.topNotes;
        var heartNotes = body.heartNotes;
        var baseNotes = body.baseNotes;
        var launchDate = body.launchDate;
        var category = body.category;
        var pathToPhotoForProduct = body.pathToPhotoForProduct;


        var wrongData = {};

        if (name && !validator.isAlphaNumeric(name)) {
            wrongData.name = name;
        }

        if (brandName && !validator.isAlphaNumeric(brandName)) {
            wrongData.brandName = brandName;
        }

        if (price && !validator.isNumeric(price)) {
            wrongData.price = price;
        }

        if ( description && (!validator.isAlpha(description) || description.length < 5 || description.length > 200) ) {
            wrongData.description = description;
        }
        if ( topNotes && (!validator.isAlpha(topNotes)|| topNotes.length > 50) ) {
            wrongData.topNotes = topNotes;
        }
        if ( heartNotes && (!validator.isAlpha(heartNotes)|| heartNotes.length > 50) ) {
            wrongData.heartNotes = heartNotes;
        }
        if (baseNotes && (!validator.isAlpha(baseNotes)|| baseNotes.length > 50)) {
            wrongData.baseNotes = baseNotes;
        }
        if (category && !validator.isAlpha(category) || category.length > 50) {
            wrongData.category = category;
        }
        if (launchDate && (!validator.isNumeric(launchDate) || launchDate > 2016) ) {
            wrongData.launchDate = launchDate;
        }
        if (pathToPhotoForProduct && !validator.isValidPath(pathToPhotoForProduct) && pathToPhotoForProduct.length < 200) {
            wrongData.pathToPhotoForProduct = pathToPhotoForProduct;
        }

        if (Object.keys(wrongData).length) {
//console.log("from create wrong data");
            res.send("wrong data was inputed!!!please fill out following fields: \n " + JSON.stringify(wrongData));
        } else {
            next();
        }
    }
};
/*
 var user = users.at(1);
 user.save();
 */