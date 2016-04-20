define([
    'backbone', 'underscore', 'text!templates/brands/pagination.html'
], function (Backbone, _, paginationTemplate) {

    var PaginationView = Backbone.View.extend({
        el: '#paginationDiv',
        template: _.template(paginationTemplate),

        initialize: function () {
            this.render();
        },

        events: {
              'click #previous': "goToPreviousPage",
              'click #next': "goToNextPage"
        },

        render: function () {
            this.$el.html(this.template());
        },

        goToPreviousPage: function(event){
            event.preventDefault();
            APP.ObjectEvent.trigger("previous", "hello from previous");
        },

        goToNextPage: function(event){
            event.preventDefault();
            APP.ObjectEvent.trigger("next", "hello from next");
        }



    });

    return PaginationView;
});

