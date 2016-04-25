define([
    'backbone',
    'underscore',
    'text!templates/shop/mainShopTemplate.html',

    'views/shop/Header',
], function (Backbone, _, mainShopTemplate, HeaderShopView, MenuAdminView, NewProductView) {

    var MainShopView = Backbone.View.extend({
        template: _.template(mainShopTemplate),
        el: '#mainContainer',

        initialize: function () {
            this.render();
            this.header = new HeaderShopView();
        },

        events: {},

        render: function() {
            this.$el.html(this.template());
        },
    });

    return MainShopView;
});
