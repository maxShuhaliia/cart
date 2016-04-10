/**
 * Created by Max on 30.03.2016.
 */

var mongoose = require('mongoose');

var brandSchema = mongoose.Schema({

    name: {
      type: String,
      required: true,
      min: 3,
      max: 15
    },

    products: [],

    description: {
    type: String,
},

    manufacturer: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('brand', brandSchema);