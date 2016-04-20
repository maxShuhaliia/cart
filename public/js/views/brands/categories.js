define([
    'backbone', 'underscore', 'text!templates/brands/categories.html'
], function (Backbone, _, sortTemplate) {

    var SortView = Backbone.View.extend({
        el: '#categories',
        template: _.template(sortTemplate),

        initialize: function () {
           this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },
    });

    return SortView;
});

