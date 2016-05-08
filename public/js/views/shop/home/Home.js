define([
    'backbone',
    'underscore',
    'text!templates/shop/home/homeTemplate.html',
    'views/shop/home/Categories',
    'views/shop/home/MensBestsellers',
    'views/shop/home/WomensBestsellers'
], function (Backbone, _, homeTemplate, Categories, MensBestsellers, WomensBestsellers) {

    return Backbone.View.extend({

        el      : '#container',
        template: _.template(homeTemplate),

        events: {},

        initialize: function () {
            this.render();
                this.categories = new Categories();
                this.mensBestsellers = new MensBestsellers();
                this.womensBestsellers = new WomensBestsellers();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });
});