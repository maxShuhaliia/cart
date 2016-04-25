define([
    'backbone',
    'underscore',
    'text!templates/shop/sort.html',
], function (Backbone, _, sortTemplate) {

    var Sort = Backbone.View.extend({

        template: _.template(sortTemplate),
        el: '#sort',

        initialize: function () {
            this.render()
        },

        events: {
            'change #view'    : "triggerChanges",
            'click #nextPage' : 'nextPage',
            'click #prevPage' : 'prevPage',
            'change #sortBy'  : "triggerChanges",
            'change #kindSort': "triggerChanges",
        },

        triggerChanges: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var page = $('#currentPage').html();
            var limit = $('#view').val();
            var sort = $('#sortBy').val();
            var kind = $('#kindSort').val();
            APP.ObjectEvent.trigger('changeSort', page, limit, sort, kind);
        },

        nextPage: function(e) {
            var currnetPage = +$('#currentPage').html();
            $('#currentPage').html(currnetPage+1);
            this.triggerChanges(e);
        },

        prevPage: function(e) {
            var currnetPage = +$('#currentPage').html();
            if(currnetPage > 1){
                $('#currentPage').html(currnetPage - 1);
            }
            this.triggerChanges(e);
        },

        render: function() {
            this.$el.html(this.template());
        },
    });

    return Sort;
});

