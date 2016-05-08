define([
    'backbone',
    'underscore',
    'text!templates/shop/banner.html',
], function(Backbone, _, bannerTemplate) {

    return Backbone.View.extend({

        el: '#banner',
        template: _.template(bannerTemplate),

        events: {},

        initialize: function() {
            this.fetch();
        },

        fetch: function() {
            var self = this;
            require([
                'collections/products'
            ], function(Collection) {
                var collection = new Collection({url: 'product/random'});
                collection.fetch({reset: true});
                collection.on('reset', function() {
                    self.collection = this.toJSON();
                    self.render();
                })
            });

            this.render();
        },

        render: function() {
            this.$el.html(this.template({collection: this.collection}));
        }




    });


})