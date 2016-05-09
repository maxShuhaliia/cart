define([
    'backbone',
    'underscore',
    'text!templates/shop/product/photoCategory.html'
], function (Backbone, _, photoCategoryTemplate) {

    return Backbone.View.extend({

        el      : '#photoCategory',
        template: _.template(photoCategoryTemplate),

        events: {},

        initialize: function (gender) {
            var url = "./images/" + gender + "_s.jpg";
            console.log('url: ', url);


            var label = gender + "'s  fragrances";
            var options = {
                urlToPhoto: url,
                label   : label
            }
            this.render(options);
        },

        render: function (options) {
            console.log(options);
            this.$el.html(this.template({options: options}));
        }
    });
});