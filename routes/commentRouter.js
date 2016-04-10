
var commentRouter = require('express').Router();
var mongoose = require('mongoose');

var Handler = require('../handlers/commentHandler');
var CommentValidator = require('../helpers/validation/commentValidator');

module.exports = (function () {

    var handler = new Handler();
    var validator = new CommentValidator();

    commentRouter.post('/', validator.isValidDataForCreateComment, handler.createComment ); // get name from body-parser
    commentRouter.get('/', handler.getCommentsByProductId );
    commentRouter.put('/:id', validator.isValidDataForUpdateComment, handler.updateCommentById ); // get name from body-parser
    commentRouter.delete('/:id', handler.deleteCommentById ); //by name

    return commentRouter;
}) ();