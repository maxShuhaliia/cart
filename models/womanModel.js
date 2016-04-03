var mongoose = require('mongoose');

var womanSchema = mongoose.Schema({

    luxoryWomen: [],
    classicWomen: [],
    sportWomen: []

});

module.exports = mongoose.model('woman', womanSchema);
