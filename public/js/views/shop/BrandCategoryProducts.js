define([
    'backbone',
    'underscore',
    'text!templates/shop/brandCategoryProducts.html',
    'views/shop/brand/Categories',
    'views/shop/brand/Brand',
    'views/shop/Sort',
    'views/shop/product/Products',
], function (Backbone, _, brandCategoryProducts, Categories, Brand, Sort, Products) {

    var BrandWithProductsView = Backbone.View.extend({

        template: _.template(brandCategoryProducts),
        el: '#container',

        initialize: function (brandId) {
              this.render();
              this.categories = new Categories();
              this.brand = new Brand(brandId);
              this.sort = new Sort();
              this.products= new Products(brandId);
        },

        events: {
        },

        render: function() {
            this.$el.html(this.template());
        },

    });

    return BrandWithProductsView;
});

