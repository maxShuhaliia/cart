var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = mongoose.Schema({

    message: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },

    target: {
        type: ObjectId,
        required: true
    },

    author: {
        type: ObjectId,
        required: true
    }

});

module.exports = mongoose.model('comment', commentSchema);