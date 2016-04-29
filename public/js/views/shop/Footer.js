define([
    'backbone',
    'underscore',
    'text!templates/shop/footerTemplate.html'
], function (Backbone, _, footerTemplate) {

    var FooterView = Backbone.View.extend({
        template: _.template(footerTemplate),
        el: '#footer',

        initialize: function () {
            this.render();
        },

        events: {
        },

        render: function() {
            this.$el.html(this.template());
        },

    });

    return FooterView;
});
