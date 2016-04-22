define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        parse: function (resp) {
            return resp;
        },

        urlRoot: function () {
            return '/brand';
        },

        validate: function(attrs){
            //if(attrs.age) {
            //    if(age < 18){
            //        return 'This service is available only for > 18';
            //    }
            //}
        },

        //urlRoot: function() {
        //    return '/brand';
        //},

        initialize: function (options) {
            this.brandName = options.brandName;
            this.description = options.description;
            this.manufacturer = options.manufacturer;
            this.pathToPhoto = options.pathToPhoto;

            this.on('invalid', function(model, error){
                console.log('Invalid model ' + error);
            });

            this.on('change', function(){
                console.log('Model changed');
            });
            this.on('change:name', function(){
                console.log('brand Name of model changed');
            });
        }
    });

    return Model;
});