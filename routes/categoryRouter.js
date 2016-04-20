var categoryRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/categoryHandler');
var Validator = require('../helpers/validation/categoryValidator');
var chackedOnLogIn = require('../config/auth/chachOnLoggedIn');

module.exports = (function () {
    var validator = new Validator();
    var handler = new Handler();
//isAdmin
    categoryRouter.post('/',  validator.isValidDataForCreateCategory, handler.createCategory );

    categoryRouter.get('/categories', handler.getCategories );
    categoryRouter.get('/', handler.getCtegoriesWithProducts );
    //isAdmin
    categoryRouter.put('/:id', validator.isValidDataForUpdateCategory, handler.updateCategoryById );
    categoryRouter.delete('/:id', handler.deleteCategoryById );

    return categoryRouter;
}) ();