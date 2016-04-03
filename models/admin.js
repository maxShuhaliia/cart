/**
 * Created by Max on 30.03.2016.
 */
var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({

    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        min: 3,
        max: 11,
        required: true
    },
    lastName: {
        type: String,
        min: 3,
        max: 11,
        required: true
    },
    dataOfBirth: {
        type: Date,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },
    lastVisit: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('admin', adminSchema);