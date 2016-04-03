var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var manSchema = mongoose.Schema({

    luxoryMan: [],
    classicMan: [],
    sportMan: []

});

module.exports = mongoose.model('man', manSchema);

