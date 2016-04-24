define([
    'backbone',
    'underscore',
    'text!templates/shop/mainShopTemplate.html',

    'views/shop/Header',
    //'views/admin/Menu',
    //'views/admin/product/NewProduct'
], function (Backbone, _, mainShopTemplate, HeaderShopView, MenuAdminView, NewProductView) {

    var MainShopView = Backbone.View.extend({
        template: _.template(mainShopTemplate),
        el: '#mainContainer',

        initialize: function () {
            this.render();
        },

        events: {

        },

        render: function() {
            this.$el.html(this.template());
            if(APP.headerShopView){
                APP.headerShopView.undelegateEvents();
            }
            APP.headerShopView = new HeaderShopView();
        },


    });

    return MainShopView;
});
