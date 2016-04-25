define([
    'backbone',
    'underscore',
    'text!templates/shop/headerTemplate.html'
], function (Backbone, _, headerTemplate) {

    var MainShopView = Backbone.View.extend({
        template: _.template(headerTemplate),
        el: '#headerShop',

        initialize: function () {
            this.render();
        },

        events: {
            'click #getBrands': "getBrands"
        },

        render: function() {
            this.$el.html(this.template());
        },

        getBrands: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#/brands';
          //  $("#mainContainer").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }

    });

    return MainShopView;
});
