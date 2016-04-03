var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var CategorySchema = mongoose.Schema({

   name : {
       type: String
   },
    gender : {
        type : String,
        enum : ["man", "woman"]
    },
    products : []

});

module.exports = mongoose.model('category', CategorySchema);