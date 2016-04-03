var orderRouter = require('express').Router();
var mongoose = require('mongoose');
var Handler = require('../handlers/orderHandler');

module.exports = (function () {

   var handler = new Handler();

    orderRouter.post('/', handler.createOrder);
    orderRouter.get('/', handler.getOrders);
    orderRouter.get('/:id', handler.getOrderById);
    orderRouter.put('/', handler.updateOrderById);
    orderRouter.delete('/:id', handler.deleteOrderById);

    return orderRouter;
})();