define([
    'backbone',
    'underscore',
    'text!templates/shop/brand/brand.html'
], function (Backbone, _, brandTemplate) {

    var Brand = Backbone.View.extend({
        template: _.template(brandTemplate),
        el: '#brand',

        initialize: function (brandId) {
            this.fetch(brandId);
        },

        events: {
            'click .brandPicture': "getProducts"
        },

        fetch: function(brandId) {
            var self = this;
            require([
                'collections/brands'
            ], function (Collection) {
                var collection = new Collection({url: '/brand/' + brandId});
                collection.fetch({reset: true});
                collection.on('reset', function() {
                    self.collection = this;
                    self.render();
                })
            });

        },

        render: function() {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },

    });

    return Brand;
});
