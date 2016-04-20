define([
    'backbone', 'underscore', 'text!templates/brands/brands.html'
], function (Backbone, _, brandsTemplate) {

    var BrandsView = Backbone.View.extend({

        el: '#brands',
        template: _.template(brandsTemplate),

        initialize: function () {
            console.log("from initialize BrandsView");
            this.render();
        },

        events: {
            'click .brandPicture': "getProducts"
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },

        getProducts: function (e) {
            e.preventDefault();
            e.stopPropagation();


            var $picture = $(e.target).closest('a');
            var brandId = $picture.data("attr");
            var navigateUrl = '#collection/brands/' + brandId;
            this.$el.empty();
            $("#products").empty();
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }
    });

    return BrandsView;
});
