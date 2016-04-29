define([
    'backbone',
    'underscore',
    'text!templates/shop/brand/brands.html',
    'collections/brands',
], function (Backbone, _, brandsTemplate, BrandsCollection ) {

    var BrandsView = Backbone.View.extend({

        el      : '#brands',
        template: _.template(brandsTemplate),

        initialize: function () {
            this.fetch();
            var self = this;
            APP.ObjectEvent.off('changeSort');
            APP.ObjectEvent.off('brandsFetched');
            APP.ObjectEvent.on('changeSort', self.changeSort, self);
            APP.ObjectEvent.on('brandsFetched', self.changeView, self)
        },

        events: {
            'click .photo': "getProducts",
        },


        changeView: function(collection) {
            this.collection = collection;
            this.render();
        },

        changeSort: function(page, limit, sort, kind) {
            var navigateUrl = 'brand/page/' + page + '/limit/' + limit + '/sort/' + sort + '/kind/' + kind;
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        fetch: function(page, limit, sort, kind) {

            page = page || 1;
            limit = limit || 12;
            sort = sort || 'brandName';
            kind = kind || 1;

            var urlToServer = '/brand?expand=comments&page=' + page +
                '&limit=' + limit + '&sort=' + sort + '&kind=' + kind;


            var self = this;
            this.collection = new BrandsCollection({url: urlToServer});
            this.collection.fetch({reset: true});
            this.collection.on('reset', function() {
                self.render()
            });
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },

        getProducts: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $picture = $(e.target).closest('a');
            var brandId = $picture.data("attr");

            var navigateUrl = '#/products/brand/' + brandId//;
            $("#mainContainer").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

    });

    return BrandsView;
});

