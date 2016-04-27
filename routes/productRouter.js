var productRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/productHandler');
var Validator = require('../helpers/validation/productValidator');
var SecureHandler = require('../handlers/securityHandler');

module.exports = (function () {

    var handler = new Handler();
    var validator = new Validator();
    var secure = new SecureHandler();

    productRouter.post('/', /*secure.forAdmin,*/ handler.createProduct);
    productRouter.get('/', handler.getProducts);
    productRouter.get('/:id', handler.getProductByIdWithComments);
    productRouter.put('/:id', secure.forAdmin, handler.updateProductById);
    productRouter.delete('/:id', secure.forAdmin, handler.deleteProductById);

    return productRouter;
})();