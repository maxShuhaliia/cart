define([
    'backbone',
    'underscore',
    'text!templates/admin/menuTemplate.html'
], function (Backbone, _, menuTemplate) {

    var MenuAdminView = Backbone.View.extend({
        template: _.template(menuTemplate),
        el: '#menu',

        initialize: function () {
            this.render();
        },

        events: {
            'click .brandPicture': "getProducts"
        },

        render: function() {
            this.$el.html(this.template());
        },

    });

    return MenuAdminView;
});
