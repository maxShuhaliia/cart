define([
    'backbone',
    'underscore',
    'text!templates/shop/product/sort.html'
], function (Backbone, _, sortTemplate) {

    return Backbone.View.extend({

        el      : '#sort',
        template: _.template(sortTemplate),

        events: {
            'change #view'    : "triggerChanges",
            'click #nextPage' : 'nextPage',
            'click #prevPage' : 'prevPage',
            'change #sortBy'  : "triggerChanges",
            'change #kindSort': "triggerChanges",
            'click .gender'   : 'triggerChanges',
        },

        initialize: function () {
            var self = this;
            APP.ObjectEvent.off('changeSort');
            APP.ObjectEvent.off('productsFetched');
            APP.ObjectEvent.on('changeSort', self.changeSort, self);
            APP.ObjectEvent.on('productsFetched', self.changeView, self)
            this.render();
        },

        changeView: function (collection) {
            this.collection = collection;
            this.render();
        },

        changeSort: function (page, limit, sort, kind, gender, category) {

            var navigateUrl = 'products/gender/' + gender + '/category/' + category + '/page/' + page + '/limit/' + limit + '/sort/' + sort + '/kind/' + kind;
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },

        triggerChanges: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var page = $('#currentPage').html();
            var limit = $('#view').val();
            var sort = $('#sortBy').val();
            var kind = $('#kindSort').val();
            var gender =  APP.view.options.gender
            var category = $("input[name=category]:checked").val() || 0;
            //var gender = $("input[name=gender]:checked").val() || 0;
            //var category = $("input[name=category]:checked").val() || 0;
            APP.ObjectEvent.trigger('changeSort', page, limit, sort, kind, gender, category);
        },

        nextPage: function (e) {
            var currnetPage = +$('#currentPage').html();
            $('#currentPage').html(currnetPage + 1);
            this.triggerChanges(e);
        },

        prevPage: function (e) {
            var currnetPage = +$('#currentPage').html();
            if (currnetPage > 1) {
                $('#currentPage').html(currnetPage - 1);
            }
            this.triggerChanges(e);
        },


        render: function () {
            this.$el.html(this.template());
        },
    });

})