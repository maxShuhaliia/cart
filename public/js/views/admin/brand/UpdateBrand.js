define([
    'backbone',
    'underscore',
    'text!templates/admin/brand/updateBrandTemplate.html',
    'models/brand'
], function (Backbone, _, newBrandTemplate, BrandModel) {

    var UpdateBrandAdminView = Backbone.View.extend({
        template: _.template(newBrandTemplate),
        el      : '#content',

        events: {
            'click #updateBrandBtn'    : "updateBrand",
            'click #updateBrandBtnHide': 'hideUpdateBrand',
        },

        initialize: function () {
            this.brand = this.collection.at(0);
            this.render();

            $('#brandName').val(this.brand.brandName);
            $('#description').val(this.brand.description);
            $('#manufacturer').val(this.brand.manufacturer);
            $('#photo').attr('src', this.brand.pathToPhoto);
        },

        render: function () {
            console.log('render   ', this.collection);
            this.$el.html(this.template({collection:  this.collection}));
        },

        updateBrand: function () {
            var manufacturer = $('#manufacturer').val();
            var description = $('#description').val();
            var brandName = $('#brandName').val();

            console.log('manufacturer: ', manufacturer);
            console.log('description: ', description);
            console.log('brandName: ', brandName);

            if(manufacturer !== this.brand.manufacturer) {
                this.brand.set({'manufacturer': manufacturer});
            };
            if(description !== this.brand.description) {
                this.brand.set({'description': description});
            };
            if(brandName !== this.brand.brandName) {
                this.brand.set({'brandName': brandName});
            };

            this.brand.save();
            $("#content").empty();
            Backbone.history.navigate(APP.prevUrl, {trigger: true});
        },

        hideUpdateBrand: function() {
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }
    });

    return UpdateBrandAdminView;
});
