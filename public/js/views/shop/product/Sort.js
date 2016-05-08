define([
    'backbone',
    'underscore',
    'text!templates/shop/sort.html'
], function(Backbone, _, sortTemplate) {

    return Backbone.View.extend({

        el: '#sort',
        template: _.template(sortTemplate),

        events: {},

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
        },
    });

})