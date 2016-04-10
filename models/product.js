var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name : {
        type: String,
        min: 3,
        max: 10,
        required: true,
    },
    pathToPhotoForProduct:{
        type: String
    },
    brandName : {
        type: String,
        min: 3,
        max: 15,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        min: 10,
        max: 200
    },
    topNotes: {
        type: String,
        max: 50,
    },
    heartNotes: {
        type: String,
        max: 50
    },
    baseNotes: {
        type: String,
        max:50
    },
    launchDate: {
        type: Number,
    },
    category: {
        type: String,
        max: 30

    },
    //gender: {
    //    type: String,
    //    enum : ["man", "woman"]
    //},
    comments: [String]
});

module.exports = mongoose.model('product', productSchema);