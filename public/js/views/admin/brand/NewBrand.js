define([
    'backbone',
    'underscore',
    'text!templates/admin/brand/newBrandTemplate.html',
    'models/brand'
], function (Backbone, _, newBrandTemplate, BrandModel) {

    var newBrandAdminView = Backbone.View.extend({
        template: _.template(newBrandTemplate),
        el      : '#content',

        events: {
            'click #createBrandBtn'    : "createBrand",
            'click #createBrandBtnHide': 'hideCreateBrand',
            'click #allProducts'         : "allProducts",
        },

        initialize: function () {
            console.log("from initialize newProductAdminView");
            this.render();
        },

        render: function () {
            console.log("from render in MenuAdminView");
            this.$el.html(this.template());
        },

        createBrand: function () {
            console.log("from create brand");
            var brandName = $('#brandName').val();
            var description = $('#description').val();
            var manufacturer = $('#manufacturer').val();

            var brandModel = new BrandModel({
                brandName  : brandName,
                description: description,
                manufacturer     : manufacturer
            });

            brandModel.save(null, {success: function(model){

                if ($('#uploadFile').get(0).files.length === 0) {
                    console.log("No files selected.");
                }else{
                    $.ajax( {
                        url: '/upload/item/brands/id/' + model.id,
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

        hideCreateBrand: function() {
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }
    });

    return newBrandAdminView;
});
