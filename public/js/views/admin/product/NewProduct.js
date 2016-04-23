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

            productModel.save(null, {success: function(model){

                if ($('#uploadFile').get(0).files.length === 0) {
                    console.log("No files selected.");
                }else{
                          $.ajax( {
                                url: '/upload/item/products/id/' + model.id,
                                type: 'POST',
                                data: new FormData( $('#uploadForm')[0] ),
                                processData: false,
                                contentType: false
                            } );
                         Backbone.history.history.back();
                    }
                }
            });



        },

        hideCreateProduct: function() {
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }


    });

    return newProductAdminView;
});
