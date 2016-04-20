define([
    'backbone', 'underscore', 'text!templates/footer.html'
], function (Backbone, _, frameTemplate) {

    var FooterView = Backbone.View.extend({

        el: '#footerContainer',
        template: _.template(frameTemplate),

        initialize: function () {
            console.log("from initialize FooterView");
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
        }
    });

    return FooterView;
});
