define([
    'backbone', 'underscore', 'text!templates/brands/products.html', 'collections/products'
], function (Backbone, _, brandTemplate, ProductCollection) {

    var BrandView = Backbone.View.extend({
        el      : '#products',
        template: _.template(brandTemplate),


        initialize: function (brandId) {
            Backbone.history.on('route', function () {
                if (Backbone.history.fragment !== this.path) {
                    console.log('from  initialize inside product');
                    this.$el.empty();
                    $("#categories").empty();
                    $("#brand").empty();
                    $("#paginationDiv").empty();

                };
            }, this);

            APP.page = 1;
            APP.limit = 10;

            var self = this;
           // this.collection = new ProductCollection({url: '/brand/products/' + brandId + '?' + 'page=' + APP.page + "&" + 'limit=' + APP.limit});
            this.collection = new ProductCollection({url: '/product/brandId/' + brandId + '?' + 'page=' + APP.page + "&" + 'limit=' + APP.limit});
            this.collection.fetch({reset: true}).done(function () {
                self.render(brandId);
            });
        },

        render: function () {
            this.path = Backbone.history.fragment;
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },
    });

    return BrandView;
});

