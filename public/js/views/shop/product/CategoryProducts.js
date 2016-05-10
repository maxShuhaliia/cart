define([
    'backbone',
    'underscore',
    'text!templates/shop/product/categoryProducts.html',
    'views/shop/Banner',
    'views/shop/Category',
    'views/shop/product/Sort',
    'views/shop/product/productsForCategory',
    'views/shop/product/photoCategory',
], function (Backbone, _, categoryProductsTemplate, Banner, Category, Sort, ProductsForCategory, PhotoCategory) {

    return Backbone.View.extend({

        template: _.template(categoryProductsTemplate),
        el      : '#container',

        initialize: function (options) {
            this.options = options;
            this.render();
            this.banner = new Banner();
            this.photoCategory = new PhotoCategory(options.category);
            this.category = new Category();
            this.sort = new Sort(options.category);
            this.products = new ProductsForCategory(options.url);

        },

        events: {},

        render: function () {
            this.$el.html(this.template());
        },
    });
});

