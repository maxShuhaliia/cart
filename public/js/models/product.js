define(['backbone'], function (Backbone) {
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
            //if(attrs.age) {
            //    if(age < 18){
            //        return 'This service is available only for > 18';
            //    }
            //}
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

         validate: function(attrs){
             attrs = attrs || {};
             console.log('from validate');
         },
    });

    return Model;
});