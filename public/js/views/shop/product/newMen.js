define([
    'backbone',
    'underscore',
    'text!templates/shop/product/newMen.html'
], function (Backbone, _, newMenTemplate) {

    return Backbone.View.extend({

        el      : '#newMen',
        template: _.template(newMenTemplate),

        events: {},

        initialize: function () {
            this.fetch();
        },

        fetch: function () {
            var self = this;
            require([
                'collections/products'
            ], function (Collection) {
                var collection = new Collection({url: 'product/new/men'});
                collection.fetch({reset: true});
                collection.on('reset', function () {
                    self.collection = this.toJSON();
                    self.render();
                })
            });
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection}));
        }
    });
});