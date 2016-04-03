var womenRouter = require('express').Router();
var Handler = require('../handlers/womenHandler');

module.exports = (function () {

    var handler = new Handler();
    womenRouter.post('/', handler.createWomenCategory ); // get name from body-parser
    womenRouter.get('/', handler.getWomenCategories );
    womenRouter.get('/:name', handler.getWomenCategory ); //get name from req.params.name

    womenRouter.put('/', handler.updateWomenCategory ); // get name from body-parser
    womenRouter.delete('/:name', handler.deleteWomenCategory ); //by name

    return womenRouter;
}) ();