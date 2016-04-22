define([
    'backbone',
    'underscore',
    'text!templates/admin/product/allProductTemplate.html',
    'models/product'
], function (Backbone, _, allProductTemplate, ProductModel) {

    var allProductAdminView = Backbone.View.extend({
        template  : _.template(allProductTemplate),
        el        : '#content',
        page      : 1,
        sort      : "price",
        limit     : 12,
        sort      : 'price',
        kindOfSort: 'desc',

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

        initialize: function () {
            this.render();
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
            e.preventDefault();
            e.stopPropagation();
            this.changeView();
        },

        kindSort: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.changeView();
        },

        changeView: function (e) {
            APP.tempArray = [];
            this.limit = +$('#view').val();
            this.sort = $('#sortBy').val();
            this.kindOfSort = $('#kindSort').val();

            var navigateUrl = '#admin/product/page/' +
                this.page + '/limit/' + this.limit + '/sort/' + this.sort + '/kind/' + this.kindOfSort;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        edit: function (e) {
            APP.tempArray = [];
            APP.prevUrl = Backbone.history.fragment;

            e.preventDefault();
            e.stopPropagation();
            var btn = $(e.target);
            var productId = btn.data("product-id");
            var navigateUrl = '#admin/updateProduct/' + productId;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        addItemToArray: function (e) {
            if ($(e.target).is(':checked')) {
                var $td = $(e.target).closest('td');
                var brandId = $td.data("product-id");
                APP.tempArray.push(brandId);
            } else {
                var $td = $(e.target).closest('td');
                var brandId = $td.data("product-id");

                var index = APP.tempArray.indexOf(brandId);
                if (index > -1) {
                    APP.tempArray.splice(index, 1);
                }
            }
        },


        deleteProducts: function (e) {
            APP.prevUrl = Backbone.history.fragment;
            e.preventDefault();
            e.stopPropagation();
            if (APP.tempArray.length) {
                    for(var i = 0; i < APP.tempArray.length; i++) {
                        var model = this.collection.get(APP.tempArray[i]);
                        model.destroy();
                    }
            }
            APP.tempArray = [];
            this.$el.empty();
            this.initialize();
        },

        render: function () {
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                page: this.page,
                limit: this.limit
            }));
            if(this.page){
                $('#currentPage').html(this.page);
            }
            if(this.limit){
                $('#view').val(this.limit);
            }
        }
    });

    return allProductAdminView;
});
