define([
    'backbone',
    'underscore',
    'text!templates/admin/product/updateProductTemplate.html',
    'models/product'
], function (Backbone, _, newProductTemplate, ProductModel) {

    var UpdateProductAdminView = Backbone.View.extend({
        template: _.template(newProductTemplate),
        el      : '#content',

        events: {
            'click #updateProductBtn'    : "updateProduct",
            'click #updateProductBtnHide': 'hideCreateProduct',
        },

        initialize: function () {
            this.product = this.collection.at(0);
            this.render();

            console.log('this.product   ', this.product);
            $('#name').val(this.product.name);
            $('div#brandName select').val(this.product.brandName);
            $('#price').val(this.product.price);
            $('#description').val(this.product.description);
            $('#topNotes').val(this.product.topNotes);
            $('#heartNotes').val(this.product.heartNotes);
            $('#baseNotes').val(this.product.baseNotes);
            $('#launchDate').val(this.product.launchDate);
            $('#category').val(this.product.category);
            $('div#gender select').val(this.product.gender);
            $('#photo').attr('src', this.product.pathToPhoto);
        },

        render: function () {
            console.log('render   ', this.collection);
            this.$el.html(this.template({collection:  this.collection}));
        },

        updateProduct: function () {
            var name = $('#name').val();
            var price = +$('#price').val();
            var topNotes = $('#topNotes').val();
            var brandId = $('#brandName').val();

            var category = $('#category').val();
            var baseNotes = $('#baseNotes').val();
            var heartNotes = $('#heartNotes').val();
            var launchDate = +$('#launchDate').val();

            var description = $('#description').val();
            var brandName = $('#' + brandId).html();
            var gender = $('#gender').val();

            console.log("insirevcsdvsdv   ", this.product);

            if(name !== this.product.name) {
                this.product.set({'name': name});
            };
            if(price !== this.product.price) {
                this.product.set({'price': price});
            };
            if(topNotes !== this.product.topNotes) {
                this.product.set({'topNotes': topNotes});
            };
            if(brandId !== this.product.brandId) {
                this.product.set({'brandId': brandId});
            };
            if(category !== this.product.category) {
                this.product.set({'category': category});
            };
            if(baseNotes !== this.product.baseNotes) {
                this.product.set({'baseNotes': baseNotes});
            };
            if(heartNotes !== this.product.heartNotes) {
                this.product.set({'heartNotes': heartNotes});
            };
            if(launchDate !== this.product.launchDate) {
                this.product.set({'launchDate': launchDate});
            };

            if(description !== this.product.description) {
                this.product.set({'description': description});
            };
            if(brandName !== this.product.brandName) {
                this.product.set({'brandName': brandName});
            };
            if(gender !== this.product.gender) {
                this.product.set({'gender': gender});
            };

            this.product.save();
            $("#content").empty();

            Backbone.history.navigate(APP.prevUrl, {trigger: true});
        },

        hideCreateProduct: function() {
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }
    });

    return UpdateProductAdminView;
});
