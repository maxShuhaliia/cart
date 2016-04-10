var productRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/productHandler');
var Validator = require('../helpers/validation/productValidator');

module.exports = (function () {

    var handler = new Handler();
    var validator = new Validator();

    productRouter.post('/',validator.isValidDataForCreateProduct, handler.createProduct);
    productRouter.get('/',                                         handler.getProducts );
    productRouter.get('/:id',                                      handler.getProductByIdWithComments );
    productRouter.put('/:id', validator.isValidDataForUpdateBrand, handler.updateProductById );
    productRouter.delete('/:id',                                   handler.deleteProductById );

    return productRouter;
})();