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
            this.fetch();
        },

        fetch: function() {
            var urlToServer = '/product/bestseller/women';
            var self = this;

            require([
                'collections/products'
            ], function (Collection) {
                var collection = new Collection({url: urlToServer});
                collection.fetch({reset: true});
                collection.on('reset', function () {
                    self.collection = this.toJSON();
                    self.render();
                });
            });
        },

        render: function() {
            this.$el.html(this.template({collection: this.collection}));
        }
    });
});