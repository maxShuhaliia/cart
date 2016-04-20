define([
    'backbone',
    'views/MainView',
    'underscore', 'text!templates/brands/products.html', 'views/FooterView', 'views/admin/MainAdmin'
], function (Backbone, MainView, _, productTemplate, FooterView, MainAdmin ) {

    return Backbone.Router.extend({

        routes: {
            '': 'mainView',
            'collection/brands': "goToBrands",
            'collection/brands/:brandId': "goToBrandWithProducts",
            'admin': 'goToAdminPage'
        },
            initialize: function() {
            },



        goToBrands: function () {
            this.mainView();
            var collectionUrl = 'collections/brands';
            var viewUrl = 'views/brands/list';

            function viewCreator() {
                var collection = this;
                require([
                    viewUrl
                ], function (View) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                        APP.view = new View({collection: collection});
                });
            }

            require([
                collectionUrl
            ], function (Collection) {
                var collection = new Collection();
                    collection.fetch({reset: true});
                    collection.on('reset', viewCreator, collection)
            });
        },

        goToBrandWithProducts: function(brandId) {
            this.mainView();
            var collectionUrl = 'collections/brands';
            var viewUrl = 'views/brands/comboBrandProducts';

                require([
                    viewUrl
                ], function (ComboBrandProducts) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }

                    APP.view = new ComboBrandProducts(brandId);
                });
        },

        mainView: function () {
           // var view = new MainView();
            if(!APP.mainView){
                APP.mainView = new MainView();
                APP.footerView = new FooterView();
            }
        },
///--------------------------------------------       for admin        --------------------------------------------
        goToAdminPage: function() {
            if(!APP.adminView) {
                APP.adminView = new MainAdmin();
            }

        }
    });




})
