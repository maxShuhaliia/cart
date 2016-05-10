define([
    'backbone',
    'underscore',
    'text!templates/shop/product/newWomen.html'
], function (Backbone, _, newWomenTemplate) {

    return Backbone.View.extend({

        el      : '#newWomen',
        template: _.template(newWomenTemplate),

        events: {},

        initialize: function () {
            this.fetch();
        },

        fetch: function () {
            var self = this;
            require([
                'collections/products'
            ], function (Collection) {
                var collection = new Collection({url: 'product/new/women'});
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