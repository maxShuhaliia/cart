define([
    'backbone', 'underscore', 'text!templates/main.html'
], function (Backbone, _, frameTemplate) {

    var MainView = Backbone.View.extend({

        el: '#headerContainer',
        template: _.template(frameTemplate),

        initialize: function () {
            console.log("from initialize MainView");
            this.render();
        },

        events: {
            'click #getBrands': "getBrands"
        },

        render: function () {
                this.$el.html(this.template());
        },

        getBrands: function (e) {
            var navigateUrl = '#collection/brands';
            e.stopPropagation();
            $("#brandWithProducts").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
    });

    return MainView;
});
