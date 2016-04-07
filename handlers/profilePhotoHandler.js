var userModel = require('../models/user');
var randomString = require('randomstring');

var fs = require('fs');
var path = require('path');

module.exports = function() {

    this.createPhotoForUserId = function(req, res) {
        var extension = path.extname(req.files.upload.path);
        var fileName = randomString.generate(12);
        var pathToFile = __dirname.split("\\").slice(0, -1).join("/") +
                                "/public/images/profilePhotoes/" + fileName + extension;
        fs.createReadStream(req.files.upload.path)
            .pipe(fs.createWriteStream(pathToFile).on('finish', function() {
                res.send("file was saved");
            }));
    };
    this.getPhotoForUserId = function(req, res, next) {
        res.send("get all orders ");
    };
    this.updatePhotoForUserId = function(req, res, next) {
        res.send("get order for user whose id is " + req.params.id );
    };
    this.deletePhotoForUserId = function(req, res, next) {
        res.send("update order by id " + req.body.id );
    };
};