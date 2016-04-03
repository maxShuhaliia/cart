
var orderModel = require('../models/order');
var validator = require('validator');

module.exports = function() {

    this.createOrder = function(req, res, next) {
        res.send("order was created" + req.body.id );
    };
    this.getOrders = function(req, res, next) {
        res.send("get all orders ");
    };
    this.getOrderById = function(req, res, next) {
        res.send("get order for user whose id is " + req.params.id );
    };
    this.updateOrderById = function(req, res, next) {
        res.send("update order by id " + req.body.id );
    };
    this.deleteOrderById = function(req, res, next) {
        res.send("delete order whose id is " + req.params.id );
    };
};