
define([
    'backbone',
    'underscore',
    'text!templates/admin/product/allProductTemplate.html',
    'models/product'
], function (Backbone, _, allProductTemplate, ProductModel) {

    var allProductAdminView = Backbone.View.extend({
        template: _.template(allProductTemplate),
        el      : '#content',

        events: {
            'click #createProductBtn'    : "createProduct"
        },

        initialize: function () {
            console.log("from initialize newProductAdminView");
            this.render();
        },

        render: function () {
            console.log("from render in allProductAdminView");
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },
    });

    return allProductAdminView;
});
