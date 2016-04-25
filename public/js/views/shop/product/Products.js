define([
    'backbone',
    'underscore',
    'text!templates/shop/product/products.html',
    'collections/products',
], function (Backbone, _, productTemplate, Collection) {

    var Sort = Backbone.View.extend({

        template: _.template(productTemplate),
        el: '#products',

        initialize: function (brandId) {
            var self = this;
            APP.ObjectEvent.off('changeSort');
            APP.ObjectEvent.off('productsFetched');
            APP.ObjectEvent.on('changeSort', self.changeSort, self);
            APP.ObjectEvent.on('productsFetched', self.changeView, self)
            this.brandId = brandId;
            this.fetch();
        },

        events: {
        },

        changeView: function(collection) {
            this.collection = collection;
            this.render();
        },

        changeSort: function(page, limit, sort, kind) {
            var navigateUrl = 'products/brandId/' + this.brandId + '/page/' + page + '/limit/' + limit + '/sort/' + sort + '/kind/' + kind;
            $("#products").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        fetch: function(page, limit, sort, kind) {
            page = page || 1;
            limit = limit || 12;
            sort = sort || 'name';
            kind = kind || 1;

            var urlToServer = '/product?expand=comments&brandId=' + this.brandId + '&page=' + page +
                '&limit=' + limit + '&sort=' + sort + '&kind=' + kind;
            var self = this;
            this.collection = new Collection({url: urlToServer});
            this.collection.fetch({reset: true});
            this.collection.on('reset', function() {
                self.render()
            });
        },

        render: function() {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },
    });

    return Sort;
});

