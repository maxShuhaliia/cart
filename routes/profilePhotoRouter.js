
var photoRouter = require('express').Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Handler = require('../handlers/profilePhotoHandler');
var Validator = require("../helpers/validation/profilePhotoValidator");

module.exports = (function () {
    var handler = new Handler();
    var validator = new Validator();
    photoRouter.post('/item/:item/id/:id', /*validator.isValidDataForCreatePhoto,*/ multipartMiddleware, handler.setPhoto );
    photoRouter.get('/:id',                            handler.getPhotoForUserId );
    photoRouter.put('/:id', multipartMiddleware,       handler.updatePhotoForUserId );
    photoRouter.delete('/:id',                         handler.deletePhotoForUserId );

    return photoRouter;
}) ();