//define([
//    'backbone',
//    'collections/brand', 'underscore', 'text!../../../templates/brand.html'
//], function (Backbone, Brands, _, brandTemplate) {
//
//    var ViewBrand = Backbone.View.extend({
//
//        template: _.template(brandTemplate),
//
//        initialize: function () {
//            this.brandList = new Brands({el: 'body'});
//        },
//
//        events: {},
//
//        render: function (data) {
//            console.log("from render brandList");
//            this.$el.append(this.template({brands: data.toJSON()}));
//            return this;
//        },
//
//        fetch : function() {
//            var self = this;
//            this.brandList.fetch({
//            reset: true,
//            success: function (data) {
//                console.log("from brandList initialize");
//                self.render(data);
//            }
//        });}
//
//
//    });
//
//    return ViewBrand;
//});

define([
    'backbone',
    'underscore',
    'collections/brands',
    'text!templates/products/products.html',
    'views/MainView'
], function (Backbone, _, Brands, productsTemplate, MainView) {
    return  MainView.extend({
        contentType      : "products",
        template: _.template(productsTemplate),

        events: {
            'click #brandPicture': "brandPicture"
        },

        brandPicture : function(e) {
            console.log(e.target);
            var $picture = $(e.target).closest('a');
            console.log("data: " + $picture.data("attr"));
            e.preventDefault();
        }
    });
});
