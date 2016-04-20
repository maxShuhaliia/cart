
var mongoose = require('mongoose');

var brandSchema = mongoose.Schema({

    brandName: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },

    products: [],

    description: {
        type: String
    },

    manufacturer: {
        type: String,
        required: false
    },

    pathToPhoto: {
        type: String,
        default: "./images/brands/paco.jpg"
    }
});

module.exports = mongoose.model('brand', brandSchema);