define([
    'backbone',
    'views/MainView',
    'underscore', 'text!templates/brands/products.html', 'views/FooterView', 'views/admin/MainAdmin'
], function (Backbone, MainView, _, productTemplate, FooterView, MainAdmin) {

    return Backbone.Router.extend({

        routes    : {
            ''                                                           : 'mainView',
            'collection/brands'                                          : "goToBrands",
            'collection/brands/:brandId'                                 : "goToBrandWithProducts",
            'admin'                                                      : 'goToAdminPage',
            'admin/createProduct'                                        : 'showCreateProduct',
            'admin/allProducts'                                          : 'showAllProducts',
            'admin/product/page/:page/limit/:limit/sort/:sort/kind/:kind': 'showProducts'


        },
        initialize: function () {
        }

        ,


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
        }
        ,

        goToBrandWithProducts: function (brandId) {
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
        }
        ,

        mainView         : function () {
            // var view = new MainView();
            if (!APP.mainView) {
                APP.mainView = new MainView();
                APP.footerView = new FooterView();
            }
        }
        ,
///--------------------------------------------       for admin        --------------------------------------------
        goToAdminPage    : function () {
            if (APP.adminView) {
                APP.adminView.undelegateEvents();
            }
            APP.adminView = new MainAdmin();
        }
        ,
// products
        showCreateProduct: function () {
            this.goToAdminPage();
            var viewUrl = 'views/admin/product/NewProduct';
            require([
                viewUrl
            ], function (newProductView) {
                //  check if this url not is a previous url
                if (APP.view) {
                    APP.view.undelegateEvents();
                    console.dir(APP.view);
                }

                console.log("router createProduct ");
                APP.view = new newProductView();
            });
        }
        ,

        showAllProducts: function () {
            this.goToAdminPage();
            var collectionUrl = 'collections/products';
            var viewUrl = 'views/admin/product/AllProducts';

            function viewCreator() {
                var collection = this;
                require([
                    viewUrl
                ], function (View) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                    console.dir(collection.toJSON());
                    APP.view = new View({collection: collection});
                });
            };

            require([
                collectionUrl
            ], function (Collection) {
                var collection = new Collection();
                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });
        }
        ,

        showProducts: function (page, limit, sort, kind) {
            this.goToAdminPage();
            page = page || 1;
            limit = limit || 6;
            sort = sort || 'price';
            kind = kind || 'desc'

            var collectionUrl = 'collections/products';
            var viewUrl = 'views/admin/product/AllProducts';

            var urlToServer = '/product?expand=comments&page=' + page +
                '&limit=' + limit + '&sort=' + sort + '&kind=' + kind;

            function viewCreator() {
                var collection = this;
                require([
                    viewUrl
                ], function (View) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                    APP.view = new View({
                        collection: collection
                    });
                    $('#currentPage').html(page);
                    $('#view').val(limit);
                    $('#sortBy').val(sort);
                    $('#kindSort').val(kind);
                });
            };

            require([
                collectionUrl
            ], function (Collection) {
                var collection = new Collection({url: urlToServer});
                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });
        }

    })
        ;
})
