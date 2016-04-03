var adminRouter = require('express').Router();
var Handler = require('../handlers/adminHandler');
var AdminValidator = require('../helpers/validation/adminValidator')

module.exports = (function () {
    var handler = new Handler();
    var validator = new AdminValidator();

    adminRouter.post('/', validator.isValidAdminData, handler.createAdmin);
    adminRouter.get('/', handler.getAdmins);
    adminRouter.get('/:id', handler.getAdminById);
    adminRouter.put('/:id', handler.updateAdminById);
    adminRouter.delete('/:id', handler.deleteAdminById);

    return adminRouter;
})();