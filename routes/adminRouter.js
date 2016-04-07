var adminRouter = require('express').Router();
var Handler = require('../handlers/adminHandler');
var AdminValidator = require('../helpers/validation/adminValidator');


module.exports = (function () {
    var handler = new Handler();
    var validator = new AdminValidator();

    adminRouter.post('/', validator.isValidDataForCreateAdmin, handler.createAdmin);
    adminRouter.get('/', handler.getAdmins);
    adminRouter.get('/:id', handler.getAdminById);
    adminRouter.put('/:id', validator.isValidDataForUpdateAdmin, handler.updateAdminById);
    adminRouter.delete('/:id', handler.deleteAdminById);

    return adminRouter;
})();