var brandRouter = require('express').Router();
var Handler = require('../handlers/brandHandler');
var Validator = require('../helpers/validation/brandValidator');

module.exports = (function() {
    var handler = new Handler();
    var validator = new Validator();

    brandRouter.post('/', validator.isValidDataForCreateBrand, handler.createBrand ); // get name from body-parser
    brandRouter.get('/', handler.getBrands );

    brandRouter.put('/:id', validator.isValidDataForUpdateBrand, handler.updateBrand ); // get name from body-parser
    brandRouter.delete('/:id', handler.deleteBrand ); //by name

    return brandRouter;
}) ();