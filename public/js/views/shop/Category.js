define([
    'backbone',
    'underscore',
    'text!templates/shop/category.html'
], function(Backbone, _, categoryTemplates) {

    return Backbone.View.extend({

        el: '#category',
        template: _.template(categoryTemplates),

        events: {

        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
        },

    });


});