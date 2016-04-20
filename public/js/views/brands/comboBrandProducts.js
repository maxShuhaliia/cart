define([
    'backbone', 'underscore' , 'views/brands/products', 'views/brands/categories',
    'text!templates/brands/frame.html', 'views/brands/brand', 'views/brands/pagination'
], function (Backbone, _, ProductsView, Categories, frameTemplate, Brand, Pagination) {

    var comboBrandProductsView = Backbone.View.extend({
        template: _.template(frameTemplate),
        el: '#brandWithProducts',

        initialize: function (brandId) {
           this.render(brandId);
        },

        events: {
            'click .brandPicture': "getProducts"
        },

        goToPreviousPage: function(event) {
            event.preventDefault();
        },

        goToNextPage: function(event) {
            event.preventDefault();
        },



        getProducts: function (e) {
        },

        render: function(brandId) {
            this.$el.html(this.template());
            this.categories = new Categories();
            this.brand = new Brand(brandId);
            this.products = new ProductsView(brandId);
            this.pagination = new Pagination();
            this.listenViews();
        },

        listenViews: function() {
           APP.channel.on("previous", function(text) {
                console.log("listenViews previous event " + text);
            });
            APP.channel.on("next", function(text) {
                console.log("listenViews next event " + text);
            })
        }
        });

    return comboBrandProductsView;
});
