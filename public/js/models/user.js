define(['backbone'], function (Backbone) {
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        parse: function (resp) {
            return resp;
        },

        validate: function (attrs) {
        },

        urlRoot: function () {
            return '/user';
        },

        initialize: function (options) {
            this.login = options.login;
            this.password = options.password;
            this.pathToPhoto = options.pathToPhoto;
            this.firstName = options.firstName;
            this.lastName = options.lastName;
            this.age = options.age;

            this.phoneNumber = options.phoneNumber;
            this.email = options.email;
            this.lastVisit = options.lastVisit;
            this.comments = options.comments;
            this.isAdmin = options.isAdmin;
            this.isBan = options.isBan;

            this.orders = options.orders;
            this.cart = options.cart;

            this.on('invalid', function (model, error) {
                console.log('Invalid model ' + error);
            });

            this.on('change', function () {
                console.log('Model changed');
            });
            this.on('change:name', function () {
                console.log('brand Name of model changed');
            });
        },

        //validate: function(attrs){
        //    attrs = attrs || {};
        //    console.log('from validate');
        //},
    });

    return Model;
});