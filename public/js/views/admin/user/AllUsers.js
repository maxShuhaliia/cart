define([
    'backbone',
    'underscore',
    'text!templates/admin/user/allUserTemplate.html',
    'models/user'
], function (Backbone, _, allUserTemplate, UserModel) {

    var allUserAdminView = Backbone.View.extend({
        template  : _.template(allUserTemplate),
        el        : '#content',
        page      : 1,
        limit     : 12,
        sort      : 'age',
        kindOfSort: '+1',

        events: {
            'change #view'    : "setItemsOnView",
            'click #nextPage' : 'nextPage',
            'click #prevPage' : 'prevPage',
            'change #sortBy'  : "sortBy",
            'change #kindSort': "kindSort",
            'click .editBtn'  : 'edit',
            'click .box'      : 'addItemToArray',
            'click #deleteBtn': 'deleteUsers'
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


            var navigateUrl = '#admin/user/page/' +
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
            var userId = btn.data("user-id");
            var navigateUrl = '#admin/updateUser/' + userId;
            this.$el.empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        addItemToArray: function (e) {
            if ($(e.target).is(':checked')) {
                var $td = $(e.target).closest('td');
                var userId = $td.data("user-id");
                APP.tempArray.push(userId);
            } else {
                var $td = $(e.target).closest('td');
                var userId = $td.data("user-id");

                var index = APP.tempArray.indexOf(userId);
                if (index > -1) {
                    APP.tempArray.splice(index, 1);
                }
            }
        },


        deleteUsers: function (e) {
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

    return allUserAdminView;
});
