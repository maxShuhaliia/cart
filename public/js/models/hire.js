define([
    'backbone',
    '../../validation/validator'
], function (Backbone, validator) {

    return Backbone.Model.extend({

        idAttribute: '_id',

        urlRoot: function () {
            return "/hire"
        },

        //validate: function (attrs) {
        //    if (attrs.name) {
        //        if (!validator.isAlpha(attrs.name)) {
        //            return 'name';
        //        }
        //    }
        //    if (attrs.companyName) {
        //        if (!validator.isAlphaNumeric(attrs.companyName)) {
        //            return 'company';
        //        }
        //    }
        //    if (attrs.message) {
        //        if (attrs.message.length > 300) {
        //            return 'message';
        //        }
        //    }
        //},
    });


})
