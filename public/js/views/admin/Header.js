define([
    'backbone',
    'underscore',
    'text!templates/admin/headerTemplate.html'
], function (Backbone, _, headerTemplate) {

    var MainAdminView = Backbone.View.extend({
        template: _.template(headerTemplate),
        el: '#headerAdmin',

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

    return MainAdminView;
});
