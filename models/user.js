
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({

    login: {
        type: String,
        required: true,
        unique: true
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
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    order: {
        type: ObjectId
    },
    comments: [String]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);