define(['backbone'], function(Backbone){
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

        validate: function(attrs){
            //if(attrs.age) {
            //    if(age < 18){
            //        return 'This service is available only for > 18';
            //    }
            //}
        },

        urlRoot: function() {
            return '/brand';
        },

        initialize: function (options) {
            this.name = options.name;
            this.brandName = options.brandName;
            this.price = options.price;
            this.pathToPhotoForProduct = pathToPhotoForProduct;
            this.description = options.description;
            this.topNotes = options.topNotes;
            this.heartNotes = options.heartNotes;
            this.baseNotes = options.baseNotes;
            this.launchDate = options.launchDate;
            this.category = options.category;
            this.brandId = options.brandId;

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