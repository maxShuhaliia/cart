define([
    'backbone',
    'underscore',
    'text!templates/admin/product/allProductTemplate.html',
    'models/product'
], function (Backbone, _, allProductTemplate, ProductModel) {

    var allProductAdminView = Backbone.View.extend({
        template: _.template(allProductTemplate),
        el      : '#content',
        page    : 1,
        sort    : "price",
        limit   : 12,

        events: {
            'change #view'   : "setItemsOnView",
            'click #nextPage': 'nextPage',
            'click #prevPage': 'prevPage'
        },

        initialize: function () {
            console.log("from initialize allProductAdminView");
            this.render();
        },

        setItemsOnView: function(e){
            e.preventDefault();
            e.stopPropagation();

            this.limit = +$('#view').val();
            this.page = 1;
            this.changeView();
        },

        nextPage: function(e) {
            e.preventDefault();
            e.stopPropagation();
            if(this.collection.length) {
                this.page = +$('#currentPage').html() + 1;
                this.changeView();
            }

        },

        prevPage: function(e) {

            e.preventDefault();
            e.stopPropagation();
            var currentPage = +$('#currentPage').html();
            if(currentPage > 1){
                this.page = currentPage - 1;
                this.changeView();
            }
        },

        changeView: function (e) {
            this.limit = +$('#view').val();
            console.log('from change view');
            var navigateUrl = '#admin/product/page/' + this.page + '/limit/' + this.limit;// + '/sort/' + this.sort;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});

        },

        render: function () {
            console.log("from render in allProductAdminView");
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                page: this.page,
                limit: this.limit
            }));
        }
    });

    return allProductAdminView;
});
