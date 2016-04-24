define([
    'backbone',
    'underscore',
    'text!templates/shop/brand/categoriesTemplate.html'
], function (Backbone, _, categoriesTemplate) {

    var CategoriesShopView = Backbone.View.extend({
        template: _.template(categoriesTemplate),
        el: '#categories',

        initialize: function () {
            console.log("categories initialize");
            this.render();
        },

        events: {
            'click .brandPicture': "getProducts"
        },

        render: function() {
            this.$el.html(this.template());
        },

    });

    return CategoriesShopView;
});
