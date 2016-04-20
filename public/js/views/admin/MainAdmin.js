define([
    'backbone',
    'underscore',
    'text!templates/admin/mainAdminTemplate.html',
    'views/admin/Header',
    'views/admin/Menu',
    'views/admin/NewProduct'
], function (Backbone, _, mainAdminTemplate, HeaderAdminView, MenuAdminView, NewProductView) {

    var MainAdminView = Backbone.View.extend({
        template: _.template(mainAdminTemplate),
        el: '#admin',

        initialize: function (brandId) {
            this.render(brandId);
        },

        events: {
            'click #newUser': "newUser",
            'click #allUsers': "allUsers",
            'click #findUser': "findUser",

            'click #newProduct': "newProduct",
            'click #allProducts': "allProducts",
            'click #findProduct': "findProduct",

            'click #newBrand': "newBrand",
            'click #allBrands': "allBrands",
            'click #findBrand': "findBrand",

            'click #newComment': "newComment",
            'click #allComments': "allComments",
            'click #findComment': "findComment",

            'click #newOrder': "newOrder",
            'click #allOrders': "allOrders",
            'click #findOrder': "findOrder",

        },

        render: function(brandId) {
            this.$el.html(this.template());
            if(APP.headerAdminView){
                APP.headerAdminView.undelegateEvents();
            }
            if(APP.menuAdminView){
                APP.menuAdminView.undelegateEvents();
            }
            APP.headerAdminView = new HeaderAdminView();
            APP.menuAdminView = new MenuAdminView();

        },
//user
        newUser: function(e) {
            console.log("from method: newUser" );
        },
        allUsers: function(e) {
            console.log("from method: allUsers" );
        },
        findUser: function(e) {
            console.log("from method: findUser" );
        },
//product
        newProduct: function(e) {
            console.log("from method: newProduct  NewProductView" );
                APP.newProductView = new NewProductView();
        },
        allProducts: function(e) {
            console.log("from method: allProducts" );
        },
        findProduct: function(e) {
            console.log("from method: findProduct" );
        },
//brand
        newBrand: function(e) {
            console.log("from method: newBrand" );
        },
        allBrands: function(e) {
            console.log("from method: allBrands" );
        },
        findBrand: function(e) {
            console.log("from method: findBrand" );
        },
//comment
        newComment: function(e) {
            console.log("from method: newComment" );
        },
        allComments: function(e) {
            console.log("from method: allComments" );
        },
        findComment: function(e) {
            console.log("from method: findComment" );
        },
//order
        newOrder: function(e) {
            console.log("from method: newOrder" );
        },
        allOrders: function(e) {
            console.log("from method: allOrders" );
        },
        findOrder: function(e) {
            console.log("from method: findOrder" );
        }





    });

    return MainAdminView;
});
