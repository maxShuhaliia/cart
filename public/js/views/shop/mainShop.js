define([
    'backbone',
    'underscore',
    'text!templates/shop/mainShopTemplate.html',
    'views/shop/Header',
    'views/shop/HeaderMenu',
    'views/shop/SearchInfo',
], function (Backbone, _, mainShopTemplate, HeaderShopView, HeaderMenuView, SearchInfoView) {

    var MainShopView = Backbone.View.extend({
        template: _.template(mainShopTemplate),
        el: '#mainContainer',

        initialize: function () {
            this.render();
            this.header = new HeaderShopView();
            this.headerMenu = new HeaderMenuView();
            this.searchInfo = new SearchInfoView();
        },

        events: {},

        render: function() {
            this.$el.html(this.template());
        },
    });

    return MainShopView;
});
