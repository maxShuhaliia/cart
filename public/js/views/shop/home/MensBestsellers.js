define([
    'backbone',
    'underscore',
    'text!templates/shop/home/mensBestsellers.html'
], function (Backbone, _, mensBestsellersTemplate) {

    return Backbone.View.extend({

        el      : '#mensBestSellers',
        template: _.template(mensBestsellersTemplate),

        events: {},

        initialize: function () {
            this.render();
            //  this.fetch();
        },

        //fetch: function () {
        //    var urlToServer = '/product/bestsellers/man';
        //    var self = this;
        //
        //    require([
        //        'collections/products'
        //    ], function (Collection) {
        //        this.collection = new Collection({url: urlToServer});
        //        this.collection.fetch({reset: true});
        //        this.collection.on('reset', function () {
        //            self.render()
        //        });
        //    });
        //},

        render: function () {
            this.$el.html(this.template());
        }
    });
});