
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({

    login: {
        type: String,
    },
    password: {
        type: String,
    },
    pathToPhoto:{
        type: String,
        default: "./images/products/default.jpg"
    },
    firstName: {
        type: String,
        min: 3,
        max: 11,
    },
    lastName: {
        type: String,
        min: 3,
        max: 11,
    },
    age: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
    },


    lastVisit: {
        type: Date,
        default: Date.now
    },
    comments: [String],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBan: {
        type: Boolean,
        default: false
    },
    orders: {
        type: ObjectId
    },
    cart: {
        type: ObjectId
    }

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);