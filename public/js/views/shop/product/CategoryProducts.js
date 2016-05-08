define([
    'backbone',
    'underscore',
    'text!templates/shop/product/categoryProducts.html',
    'views/shop/Banner',
    'views/shop/Category',
    'views/shop/product/Sort',
    'views/shop/product/productsForCategory',
], function (Backbone, _, categoryProductsTemplate, Banner, Category, Sort, ProductsForCategory) {

    return Backbone.View.extend({

        template: _.template(categoryProductsTemplate),
        el      : '#container',

        initialize: function (urlToServerProducts) {
            console.log('urlToServerProducts: ', urlToServerProducts);
            this.render();
            this.banner = new Banner();
            this.category = new Category();
            this.sort = new Sort();
            this.products = new ProductsForCategory(urlToServerProducts);

        },

        events: {},

        render: function () {
            this.$el.html(this.template());
        },
    });
});

