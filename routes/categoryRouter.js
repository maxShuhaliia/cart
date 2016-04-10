var categoryRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/categoryHandler');
var Validator = require('../helpers/validation/categoryValidator');


module.exports = (function () {
    var validator = new Validator();
    var handler = new Handler();

    categoryRouter.post('/', validator.isValidDataForCreateCategory, handler.createCategory );
    categoryRouter.get('/categories', handler.getCategories );
    categoryRouter.get('/', handler.getCtegoriesWithProducts );
    //
    categoryRouter.put('/:id', validator.isValidDataForUpdateCategory, handler.updateCategoryById );
    categoryRouter.delete('/:id', handler.deleteCategoryById );

    return categoryRouter;
}) ();