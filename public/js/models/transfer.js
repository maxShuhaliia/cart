define(['backbone'], function (Backbone) {
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        validate: function (attrs) {
        },

        urlRoot: function () {
            return '/user/login';
        },

    });

    return Model;
});