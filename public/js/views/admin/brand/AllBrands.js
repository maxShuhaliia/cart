define([
    'backbone',
    'underscore',
    'text!templates/admin/brand/allBrandTemplate.html',
    'models/brand'
], function (Backbone, _, allBrandTemplate, BrandModel) {

    var allBrandsAdminView = Backbone.View.extend({
        template  : _.template(allBrandTemplate),
        el        : '#content',
        page      : 1,
        sort      : "brandName",
        limit     : 12,
        kindOfSort: '+1',

        events: {
            'change #view'    : "setItemsOnView",
            'click #nextPage' : 'nextPage',
            'click #prevPage' : 'prevPage',
            'change #sortBy'  : "sortBy",
            'change #kindSort': "kindSort",
            'click .editBtn'  : 'edit',
            'click .box'       : 'addItemToArray',
            'click #deleteBtn': 'deleteBrands'
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
            var navigateUrl = '#admin/brand/page/' +
                this.page + '/limit/' + this.limit + '/sort/' + this.sort + '/kind/' + this.kindOfSort;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});

        },

        edit: function(e) {
            APP.prevUrl = Backbone.history.fragment;

            e.preventDefault();
            e.stopPropagation();
            var btn = $(e.target);
            var brandId = btn.data("brand-id");
            var navigateUrl = '#admin/updateBrand/' + brandId;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        addItemToArray: function(e) {
            if( $(e.target).is(':checked') ) {
                var $td = $(e.target).closest('td');
                var brandId = $td.data("brand-id");
                APP.tempArray.push(brandId);
            }else{
                var $td = $(e.target).closest('td');
                var brandId = $td.data("brand-id");

                var index = APP.tempArray.indexOf(brandId);
                if (index > -1) {
                    APP.tempArray.splice(index, 1);
                }
            }
        },


        deleteBrands: function (e) {
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
            console.log("from render in allProductAdminView");
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                page      : this.page,
                limit     : this.limit
            }));
            if(this.page){
                $('#currentPage').html(this.page);
            }
            if(this.limit){
                $('#view').val(this.limit);
            }
        }
    });

    return allBrandsAdminView;
});
