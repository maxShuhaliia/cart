define([
    'backbone',
    '../../validation/validator'
], function (Backbone, validator) {
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        //defaults: {
        //    name: 'name',
        //    description: 'desc',
        //    manufacturer: 'China',
        //    pathToPhoto: './images/brands/paco.jpg'
        //},

        parse: function (resp) {
            return resp;
        },

        validate: function (attrs) {
            if (attrs.name) {
                if (!validator.isAlpha(attrs.name)) {
                    return 'wrong name';
                }
            }
            if (attrs.price) {
                if (!validator.isNumeric(attrs.price)) {
                    return 'wrong price';
                }
            }
            if (attrs.topNotes) {
                if (!validator.isAlpha(attrs.topNotes)) {
                    return 'wrong topNotes';
                }
            }
            //if (attrs.brandId) {
            //    if (!validator.isAlpha(attrs.brandId)) {
            //        return 'wrong topNotes';
            //    }
            //}
            if (attrs.category) {
                if (!validator.isAlpha(attrs.category)) {
                    return 'wrong category';
                }
            } if (attrs.baseNotes) {
                if (!validator.isAlpha(attrs.baseNotes)) {
                    return 'wrong baseNotes';
                }
            }
            if (attrs.heartNotes) {
                if (!validator.isAlpha(attrs.heartNotes)) {
                    return 'wrong topNotes';
                }
            }
            if (attrs.launchDate) {
                if (!(validator.isNumeric(attrs.launchDate)) || !((+attrs.launchDate < 2016) && (+attrs.launchDate > 2000)) ) {
                    return 'launch date must be between 2000 and 2016';
                }
            }


        },

        urlRoot: function () {
            return '/product';
        },

        initialize: function (options) {
            this.name = options.name;
            this.price = options.price;
            this.topNotes = options.topNotes;
            this.brandId = options.brandId;
            this.category = options.category;
            this.baseNotes = options.baseNotes;
            this.heartNotes = options.heartNotes;
            this.launchDate = options.launchDate;
            this.description = options.description;
            this.brandName = options.brandName;
            this.gender = options.gender;
            this.pathToPhoto = options.pathToPhoto;

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
    });

    return Model;
});