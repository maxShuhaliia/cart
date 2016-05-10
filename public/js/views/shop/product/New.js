define([
    'backbone',
    'underscore',
    'text!templates/shop/product/new.html',
    'views/shop/product/newMen',
    'views/shop/product/newWomen',
], function(Backbone, _, newTemplate, NewMen, NewWomen) {

    return Backbone.View.extend({
        el: '#container',
        template: _.template(newTemplate),
        events: {},

        initialize: function() {
            this.render();
            this.newMen = new NewMen();
            this.newWomen = new NewWomen();

        },

        render: function() {
            this.$el.html(this.template());
        }
    });
});