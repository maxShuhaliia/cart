/**
 * Created by Max on 24.03.2016.
 */

var manRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/manHandler');

module.exports = (function () {
    //var manModel = mongoose.model("manCategory", manSchema );//3 - name of collection
    var handler = new Handler();

    manRouter.post('/', handler.createManCategory); // get name from body-parser
    manRouter.get('/', handler.getManCategories );
    manRouter.get('/:name', handler.getManCategory ); //get name from req.params.name

    manRouter.put('/', handler.updateManCategory ); // get name from body-parser
    manRouter.delete('/:name', handler.deleteManCategory ); //by name

    return manRouter;
}) ();