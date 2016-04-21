define([
    'backbone',
    'underscore',
    'text!templates/admin/product/newProductTemplate.html',
    'models/product'
], function (Backbone, _, newProductTemplate, ProductModel) {

    var newProductAdminView = Backbone.View.extend({
        template: _.template(newProductTemplate),
        el      : '#content',

        events: {
            'click #createProductBtn'    : "createProduct",
            'click #createProductBtnHide': 'hideCreateProduct',
            'click #allProducts'         : "allProducts",
            'click #findProduct'         : "findProduct"
        },

        initialize: function () {
            console.log("from initialize newProductAdminView");
            this.render();
        },

        render: function () {
            console.log("from render in MenuAdminView");
            this.$el.html(this.template());
        },

        createProduct: function () {
            var name = $('#name').val();
            var price = $('#price').val();
            var topNotes = $('#topNotes').val();
            var brandId = $('#brandName').val();
            var category = $('#category').val();
            var baseNotes = $('#baseNotes').val();
            var heartNotes = $('#heartNotes').val();
            var launchDate = $('#launchDate').val();
            var description = $('#description').val();

            var brandName = $('#' + brandId).html();
            var gender = $('#gender').val();


            var productModel = new ProductModel({
                name       : name,
                price      : price,
                topNotes   : topNotes,
                brandId    : brandId,
                category   : category,
                baseNotes  : baseNotes,
                heartNotes : heartNotes,
                launchDate : launchDate,
                description: description,
                brandName  : brandName,
                gender     : gender
            });

            productModel.save();


            //console.log('name: ', name);
            //console.log('price: ', price);
            //console.log('topNotes: ', topNotes);
            //console.log('brandId: ', brandId);
            //console.log('category: ', category);
            //console.log('baseNotes: ', baseNotes);
            //console.log('heartNotes: ', heartNotes);
            //console.log('launchDate: ', launchDate);
            //console.log('description: ', description);

        },

        hideCreateProduct: function() {
            console.log("hide");
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }


    });

    return newProductAdminView;
});
