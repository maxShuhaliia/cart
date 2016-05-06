var router = require('express').Router();
var HireHandler = require('../handlers/hireHandler');

module.exports = (function() {

    var hireHandler = new HireHandler();

    router.post('/', hireHandler.hire);

    return router;

})();




