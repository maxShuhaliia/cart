define([
    'backbone',
    'underscore',
    'text!templates/shop/home/mensBestsellers.html'
], function (Backbone, _, mensBestsellersTemplate) {

    return Backbone.View.extend({

        el      : '#mensBestSellers',
        template: _.template(mensBestsellersTemplate),

        events: {},

        initialize: function () {
             this.fetch();
        },

        fetch: function () {
            var urlToServer = '/product/bestseller/men';
            var self = this;

            require([
                'collections/products'
            ], function (Collection) {
                var collection = new Collection({url: urlToServer});
                collection.fetch({reset: true});
                collection.on('reset', function () {
                    self.collection = this.toJSON();
                    self.render()
                });
            });
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection}));
        }
    });
});