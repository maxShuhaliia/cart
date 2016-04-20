define([
    'backbone', 'underscore', 'text!templates/brands/brand.html',  'collections/brands'
], function (Backbone, _, brandTemplate, BrandCollection) {

    var BrandView = Backbone.View.extend({
        el: '#brand',
        template: _.template(brandTemplate),

        initialize: function (brandId) {

            var self = this;
            this.collection = new BrandCollection({url: '/brand/' + brandId});
            this.collection.fetch({reset: true}).done(function() {
                self.render();
            });

        },

        render: function (brandId) {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },
    });

    return BrandView;
});

