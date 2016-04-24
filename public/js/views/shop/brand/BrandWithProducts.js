define([
    'backbone',
    'underscore',
    'text!templates/shop/product/products.html',
    'views/shop/brand/Categories',
    'views/shop/brand/Brand'
], function (Backbone, _, productsTemplate, CategoriesShopView, BrandShopView) {

    var BrandWithProductsView = Backbone.View.extend({

        el      : '#content',
        template: _.template(productsTemplate),

        initialize: function () {
            this.categories = new CategoriesShopView();
            this.render();
            this.brand = new BrandShopView(this.collection.brandId);
        },

        events: {
            'change #view'    : "setItemsOnView",
            'click #nextPage' : 'nextPage',
            'click #prevPage' : 'prevPage',
            'change #sortBy'  : "sortBy",
            'change #kindSort': "kindSort",
            'click .editBtn'  : 'edit',
            'click .box'      : 'addItemToArray',
            'click #deleteBtn': 'deleteProducts'
        },

        render: function () {
            this.$el.html(this.template({
                collection: this.collection.toJSON(),

            }));
            $('#currentPage').html(this.collection.page);
            $("#view [value=" + this.collection.page + "]").attr("selected", "selected");
            $("#sortBy [value=" + this.collection.sort + "]").attr("selected", "selected");
            $("#kindSort [value=" + this.collection.kind + "]").attr("selected", "selected");
        },

        setItemsOnView: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.collection.limit = +$('#view').val();
            this.collection.page = 1;
            this.changeView();
        },

        nextPage: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.collection.length) {
                this.collection.page = +$('#currentPage').html() + 1;
                this.changeView();
            }
        },

        prevPage: function (e) {

            e.preventDefault();
            e.stopPropagation();
            var currentPage = +$('#currentPage').html();
            if (currentPage > 1) {
                this.collection.page = currentPage - 1;
                this.changeView();
            }
        },

        sortBy: function (e) {
            this.collection.limit = +$('#view').val();
            this.collection.page = +$('#currentPage').html();
            e.preventDefault();
            e.stopPropagation();
            this.changeView();
        },

        kindSort: function (e) {
            this.collection.limit = $('#view').val();
            this.collection.page = $('#currentPage').html();
            e.preventDefault();
            e.stopPropagation();
            this.changeView();
        },

        changeView: function (e) {
            this.collection.limit = $('#view').val();
            this.collection.sort = $('#sortBy').val();
            this.collection.kindOfSort = $('#kindSort').val();

            var navigateUrl = '#shop/products/brandId/' + this.collection.brandId +
                '/page/' + this.collection.page + '/limit/' + this.collection.limit +
                '/sort/' + this.collection.sort + '/kind/' + this.collection.kindOfSort;
            this.$el.empty();

            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        addItemToArray: function (e) {
            if ($(e.target).is(':checked')) {
                var $td = $(e.target).closest('td');
                var brandId = $td.data("brand-id");
                APP.tempArray.push(brandId);
            } else {
                var $td = $(e.target).closest('td');
                var brandId = $td.data("brand-id");

                var index = APP.tempArray.indexOf(brandId);
                if (index > -1) {
                    APP.tempArray.splice(index, 1);
                }
            }
        }
    });

    return BrandWithProductsView;
});

