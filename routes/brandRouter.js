var brandRouter = require('express').Router();
var Handler = require('../handlers/brandHandler');

module.exports = (function() {
    var handler = new Handler();

    brandRouter.post('/', handler.createBrand ); // get name from body-parser
    brandRouter.get('/', handler.getBrands );

    brandRouter.put('/:id', handler.updateBrand ); // get name from body-parser
    brandRouter.delete('/:id', handler.deleteBrand ); //by name

    return brandRouter;
}) ();