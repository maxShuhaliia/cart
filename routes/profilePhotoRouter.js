
var photoRouter = require('express').Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Handler = require('../handlers/profilePhotoHandler');


module.exports = (function () {
    var handler = new Handler();
    photoRouter.post('/', multipartMiddleware,         handler.createPhotoForUserId );
    photoRouter.get('/:id',                            handler.getPhotoForUserId );
    photoRouter.put('/:id', multipartMiddleware,       handler.updatePhotoForUserId );
    photoRouter.delete('/:id',                         handler.deletePhotoForUserId );

    return photoRouter;
}) ();