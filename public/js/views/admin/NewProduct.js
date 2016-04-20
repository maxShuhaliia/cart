define([
    'backbone',
    'underscore',
    'text!templates/admin/newProductTemplate.html'
], function (Backbone, _, newProductTemplate) {

    var newProductAdminView = Backbone.View.extend({
        template: _.template(newProductTemplate),
        el: '#content',

        initialize: function () {
            console.log("from initialize newProductAdminView");
            this.render();
        },

        events: {
            'click .brandPicture': "getProducts"
        },

        render: function() {
            console.log("from render in MenuAdminView");
            this.$el.html(this.template());
        },

    });

    return newProductAdminView;
});
