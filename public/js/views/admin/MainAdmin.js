define([
    'backbone',
    'underscore',
    'text!templates/admin/mainAdminTemplate.html',
    'views/admin/Header',
    'views/admin/Menu',
    'views/admin/product/NewProduct'
], function (Backbone, _, mainAdminTemplate, HeaderAdminView, MenuAdminView, NewProductView) {

    var MainAdminView = Backbone.View.extend({
        template: _.template(mainAdminTemplate),
        el: '#admin',

        initialize: function (brandId) {
            this.render(brandId);
        },

        events: {
            'click #createUser': "createUser",
            'click #allUsers': "allUsers",

            'click #createProduct': "createProduct",
            'click #allProducts': "allProducts",

            'click #createBrand': "createBrand",
            'click #allBrands': "allBrands",

            'click #newComment': "newComment",
            'click #allComments': "allComments",

            'click #newOrder': "newOrder",
            'click #allOrders': "allOrders",

        },

        render: function() {
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
        createUser: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#admin/createUser';
            $("#content").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
        allUsers: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#admin/allUsers';
            $("#content").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
//product
        createProduct: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#admin/createProduct';
            $("#content").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        allProducts: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#admin/allProducts';
            $("#content").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
        findProduct: function(e) {
            console.log("from method: findProduct" );
        },
//brand
        createBrand: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#admin/createBrand';
            $("#content").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
        allBrands: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var navigateUrl = '#admin/allBrands';
            $("#content").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
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
