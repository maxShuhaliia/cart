define([
    'backbone',
    'underscore',
    'text!templates/shop/product/products.html'
], function(Backbone, _, productsTemplate ) {

    return Backbone.View.extend({

        el: '#products',
        template: _.template(productsTemplate),

        events: {},

        initialize: function(urlToServer) {
            var self = this;
            APP.ObjectEvent.off('productsFetched');
            APP.ObjectEvent.on('productsFetched', self.changeView, self)
            this.fetch(urlToServer);
        },

        fetch: function(urlToServer) {
            var self = this;
            require([
                'collections/products'
            ], function(Collection) {
                self.collection = new Collection({url: urlToServer});
                self.collection.fetch({reset: true});
                self.collection.on('reset', function() {
                    self.render();
                })
            })
        },

        changeView: function(collection) {
            this.collection = collection;
            this.render();
        },

        render: function() {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        }


    });



})
