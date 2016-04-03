var userRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/userHandler');
var UserValidator = require('../helpers/validation/userValidator');

module.exports = (function () {

    var handler = new Handler();
    var validator = new UserValidator();


    userRouter.post('/', validator.isValidUserData, handler.createUser);

    userRouter.get('/', handler.getUsers);
    userRouter.get('/:id', handler.getUserById);
    userRouter.get('/:id/comments', handler.getUserByIdWithComments);


    userRouter.put('/:id', validator.isValidUserData, handler.updateUserById);
    userRouter.delete('/:id', handler.deleteUserById);

    return userRouter;
})();