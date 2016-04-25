define([
    'backbone',
    'underscore',
    'views/shop/brand/Categories',
    'text!templates/shop/brandCategory.html',
    'views/shop/Sort',
    'views/shop/brand/Brands',
], function (Backbone, _, Categories, brandCategory, Sort, Brands) {

    var BrandCategory = Backbone.View.extend({

        template: _.template(brandCategory),
        el: '#container',

        initialize: function () {
            this.render();
            this.categories = new Categories();
            this.sort = new Sort();
            this.brands = new Brands();
        },

        events: {
        },

        render: function() {
            this.$el.html(this.template());
        },
    });

    return BrandCategory;
});

