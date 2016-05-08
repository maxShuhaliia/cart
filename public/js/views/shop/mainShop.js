define([
    'backbone',
    'underscore',
    'text!templates/shop/mainShopTemplate.html',
    'views/shop/Header',
    'views/shop/HeaderMenu',
    'views/shop/SearchInfo',
    'views/shop/Footer',
    'views/shop/home/Home'
], function (Backbone, _, mainShopTemplate, HeaderShopView, HeaderMenuView, SearchInfoView, FooterView, HomeView) {

    var MainShopView = Backbone.View.extend({
        template: _.template(mainShopTemplate),
        el: '#mainContainer',

        initialize: function () {
            this.render();
            this.header = new HeaderShopView();
            this.headerMenu = new HeaderMenuView();
            this.searchInfo = new SearchInfoView();
            if(Backbone.history.fragment === ""){
                this.content = new HomeView();
            }
            this.footer = new FooterView();
        },

        events: {},

        render: function() {
            this.$el.html(this.template());
        },
    });

    return MainShopView;
});
