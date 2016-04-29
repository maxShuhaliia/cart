define([
    'backbone',
    'underscore',
    'text!templates/shop/searchInfo.html'
], function (Backbone, _, searchInfoTemplate) {

    var SearchInfoView = Backbone.View.extend({
        template: _.template(searchInfoTemplate),
        el: '#searchInfo',

        initialize: function () {
            this.render();
        },

        events: {

        },

        render: function() {
            this.$el.html(this.template());
        }
    });

    return SearchInfoView;
});
