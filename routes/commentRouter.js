
var commentRouter = require('express').Router();
var mongoose = require('mongoose');

var Handler = require('../handlers/commentHandler');

module.exports = (function () {

    var handler = new Handler();

    commentRouter.post('/', handler.createComment ); // get name from body-parser
    commentRouter.get('/:id', handler.getCommentsByProductId );
    commentRouter.put('/:id', handler.updateCommentById ); // get name from body-parser
    commentRouter.delete('/:id', handler.deleteCommentById ); //by name

    return commentRouter;
}) ();