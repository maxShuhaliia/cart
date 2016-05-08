define([
    'backbone',
    'underscore',
    'text!templates/shop/home/categories.html'
], function (Backbone, _, categoriesTemplate) {

    return Backbone.View.extend({

        el      : '#categories',
        template: _.template(categoriesTemplate),

        events: {
            'click #women': 'women',
            'click #new': 'new',
            'click #men': 'men'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },

        men: function() {
            var url = 'products/gender/men/category/0/page/1/limit/12/sort/name/kind/1';
            Backbone.history.navigate(url, {trigger: true});
        },

        women: function() {
            var url = 'products/gender/women/category/0/page/1/limit/12/sort/name/kind/1';
            Backbone.history.navigate(url, {trigger: true});
        },

        new: function() {
            var url = 'products/gender/0/category/new/page/1/limit/12/sort/name/kind/1';
            Backbone.history.navigate(url, {trigger: true});
        },
    });


});