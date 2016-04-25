var brandRouter = require('express').Router();
var Handler = require('../handlers/brandHandler');
var Validator = require('../helpers/validation/brandValidator');
var SecureHandler = require('../handlers/securityHandler');


module.exports = (function() {
    var handler = new Handler();
    var secure = new SecureHandler();
    var validator = new Validator();

    brandRouter.post('/', secure.forAdmin,  handler.createBrand ); // get name from body-parser

    brandRouter.get('/', handler.getBrands );
    brandRouter.get('/products/:id', handler.getProductsByBrandId );
    brandRouter.get('/:id', handler.getBrandById );

    brandRouter.put('/:id', secure.forAdmin, handler.updateBrand ); // get name from body-parser
    brandRouter.delete('/:id', secure.forAdmin, handler.deleteBrand ); //by name

    return brandRouter;
}) ();