var userRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/userHandler');
var UserValidator = require('../helpers/validation/userValidator');
var chackedOnLogIn = require('../config/auth/chachOnLoggedIn');


module.exports = (function () {

    var handler = new Handler();
    var validator = new UserValidator();

    userRouter.post('/', validator.isValidDataForCreateUser, handler.createUser);

    userRouter.get('/', /*chackedOnLogIn.isLoggedIn,*/ handler.getUsers);
    userRouter.get('/:id', /*chackedOnLogIn.isLoggedIn,*/ handler.getUserById);
    userRouter.get('/:id/comments', /* chackedOnLogIn.isLoggedIn,*/ handler.getUserByIdWithComments);


    userRouter.put('/:id', validator.isValidDataForUpdateUser, handler.updateUserById);
    userRouter.delete('/:id', chackedOnLogIn.isLoggedIn, handler.deleteUserById);

    return userRouter;
})();