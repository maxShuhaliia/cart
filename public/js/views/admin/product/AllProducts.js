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
            'click .box'       : 'addItemToArray',
            'click #deleteBtn': 'deleteProducts'
        },

        initialize: function () {
            console.log("from initialize allProductAdminView");
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
            this.limit = +$('#view').val();
            this.sort = $('#sortBy').val();
            this.kindOfSort = $('#kindSort').val();
            console.log("changeView  sort:  ", this.sort);
            console.log("changeView  kindOfSort:  ", this.kindOfSort);

            console.log('from change view');
            var navigateUrl = '#admin/product/page/' +
                this.page + '/limit/' + this.limit + '/sort/' + this.sort + '/kind/' + this.kindOfSort;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});

        },

        edit: function(e) {
            APP.prevUrl = Backbone.history.fragment;

            e.preventDefault();
            e.stopPropagation();
            var btn = $(e.target);
            var productId = btn.data("product-id");
            var navigateUrl = '#admin/updateProduct/' + productId;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        addItemToArray: function(e) {
            if( $(e.target).is(':checked') ) {
                var $td = $(e.target).closest('td');
                var brandId = $td.data("product-id");
                APP.tempArray.push(brandId);
            }else{
                var $td = $(e.target).closest('td');
                var brandId = $td.data("product-id");

                var index = APP.tempArray.indexOf(brandId);
                if (index > -1) {
                    APP.tempArray.splice(index, 1);
                }
            }
            console.log(APP.tempArray);
        },


        deleteProducts: function (e) {
            APP.prevUrl = Backbone.history.fragment;
            e.preventDefault();
            e.stopPropagation();
            if(APP.tempArray.length){
                if(APP.tempArray.length === 1) {
                    var model = this.collection.get(APP.tempArray[0]);
                    model.destroy();
                }
            }
            this.$el.empty();
            var prevUrl = "";
            if(APP.history.length >= 2){
                prevUrl = APP.history[APP.history.length-2];
            }
            Backbone.history.navigate(prevUrl, {trigger: true});

        },

        render: function () {
            console.log("from render in allProductAdminView");
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                page      : this.page,
                limit     : this.limit
            }));
        }
    });

    return allProductAdminView;
});
