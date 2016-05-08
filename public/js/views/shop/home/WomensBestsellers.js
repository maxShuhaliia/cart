define([
    'backbone',
    'underscore',
    'text!templates/shop/home/womensBestsellers.html'
], function(Backbone, _, womensBestsellersTemplate) {

    return Backbone.View.extend({

        el: "#womensBestSellers",
        template: _.template(womensBestsellersTemplate),

        events: {},

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
        }
    });
});