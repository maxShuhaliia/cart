define([
    'backbone',
    'underscore',
    'text!templates/shop/brand/AllBrandsTemplate.html',
    'views/shop/brand/Categories'
], function (Backbone, _, brandsTemplate, CategoriesShopView) {

    var BrandsView = Backbone.View.extend({

        el      : '#content',
        template: _.template(brandsTemplate),

        initialize: function () {
            this.render();
        },

        events: {
            'click .getBrands': "getProducts",

            'change #view'    : "setItemsOnView",
            'click #nextPage' : 'nextPage',
            'click #prevPage' : 'prevPage',
            'change #sortBy'  : "sortBy",
            'change #kindSort': "kindSort",
            'click .box'      : 'addItemToArray',
        },

        render: function () {
            if (APP.categoriesShopView) {
                APP.categoriesShopView.undelegateEvents();
            }
            APP.categoriesShopView = new CategoriesShopView();
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                page       : this.page,
                limit     : this.limit
            }));
            if (this.page) {
                $('#currentPage').html(this.page);
            }
            if (this.limit) {
                $('#view').val(this.limit);
            }
        },

        getProducts: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $picture = $(e.target).closest('a');
            var brandId = $picture.data("attr");
            var navigateUrl = '#collection/brands/' + brandId;
            this.$el.empty();
            $("#products").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        setItemsOnView: function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.limit = +$('#view').val();
            this.page = 1;
            this.changeView();
        },

        nextPage: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.collection.length) {
                this.page = +$('#currentPage').html() + 1;
                this.changeView();
            }

        },

        prevPage: function (e) {

            e.preventDefault();
            e.stopPropagation();
            var currentPage = +$('#currentPage').html();
            if (currentPage > 1) {
                this.page = currentPage - 1;
                this.changeView();
            }
        },

        sortBy: function (e) {
            this.limit = +$('#view').val();
            this.page = +$('#currentPage').html();
            e.preventDefault();
            e.stopPropagation();
            this.changeView();
        },

        kindSort: function (e) {
            this.limit = +$('#view').val();
            this.page = +$('#currentPage').html();
            e.preventDefault();
            e.stopPropagation();
            this.changeView();
        },

        changeView: function (e) {
            this.limit = +$('#view').val();
            this.sort = $('#sortBy').val();
            this.kindOfSort = $('#kindSort').val();
            var navigateUrl = '#shop/brand/page/' +
                this.page + '/limit/' + this.limit + '/sort/' + this.sort + '/kind/' + this.kindOfSort;
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

    return BrandsView;
});

