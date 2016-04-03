var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({

    userId: {
        type: Number,
        required: true
    },

    products: [],

    orderDate: {
        type: Date
    }

});

module.exports = mongoose.model('order', orderSchema);