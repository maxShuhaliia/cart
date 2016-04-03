var productRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/productHandler');

module.exports = (function () {

    var handler = new Handler();

    productRouter.post('/', handler.createProduct );
    //gets some amount of products and limit  with query
    productRouter.get('/', handler.getProducts );

    productRouter.get('/:id', handler.getProductByIdWithComments );
    productRouter.put('/:id', handler.updateProductById );
    productRouter.delete('/:id', handler.deleteProductById );

    return productRouter;
})();