var categoryRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/categoryHandler');


module.exports = (function () {

    var handler = new Handler();

    categoryRouter.post('/', handler.createCategory ); // get name from body-parser
    categoryRouter.get('/categories', handler.getCategories );
    categoryRouter.get('/', handler.getCtegoriesWithProducts );

    categoryRouter.put('/:id', handler.updateCategoryById ); // get name from body-parser
    categoryRouter.delete('/:id', handler.deleteCategoryById ); //by name

    return categoryRouter;
}) ();