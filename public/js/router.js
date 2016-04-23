define([
    'backbone',
    'views/MainView',
    'underscore', 'text!templates/brands/products.html', 'views/FooterView', 'views/admin/MainAdmin'
], function (Backbone, MainView, _, productTemplate, FooterView, MainAdmin) {

    return Backbone.Router.extend({

        routes: {
            ''                          : 'mainView',
            'collection/brands'         : "goToBrands",
            'collection/brands/:brandId': "goToBrandWithProducts",
            'admin'                     : 'goToAdminPage',

            'admin/createProduct'                                        : 'showCreateProduct',
            'admin/allProducts'                                          : 'showAllProducts',
            'admin/product/page/:page/limit/:limit/sort/:sort/kind/:kind': 'showProducts',
            'admin/updateProduct/:productId'                             : 'updateProduct',

            'admin/createBrand'                                        : 'showCreateBrand',
            'admin/allBrands'                                          : 'showAllBrands',
            'admin/brand/page/:page/limit/:limit/sort/:sort/kind/:kind': 'showBrands',
            'admin/updateBrand/:id'                                    : 'updateBrand',

            'admin/createUser'                                        : 'showCreateUser',
            'admin/allUsers'                                          : 'showAllUsers',
            'admin/user/page/:page/limit/:limit/sort/:sort/kind/:kind': 'showUsers',
            'admin/updateUser/:id'                                    : 'updateUser'
        },

        initialize: function () {
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
        }
        ,

        goToBrandWithProducts: function (brandId) {
            APP.history.push(Backbone.history.fragment);
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
            APP.history.push(Backbone.history.fragment);
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
            APP.history.push(Backbone.history.fragment);
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
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            page = page || 1;
            limit = limit || 6;
            sort = sort || 'price';
            kind = kind || 'desc';

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
        },

        updateProduct: function (idProduct) {
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var collectionUrl = 'collections/products';
            var viewUrl = 'views/admin/product/UpdateProduct';

            var urlToServer = '/product/' + idProduct;

            function viewCreator() {
                var collection = this;
                require([
                    viewUrl
                ], function (View) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                    console.log(collection);
                    APP.view = new View({
                        collection: collection
                    });
                });
            };

            require([
                collectionUrl
            ], function (Collection) {
                var collection = new Collection({url: urlToServer});
                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });
        },

// brand
        showCreateBrand: function () {
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var viewUrl = 'views/admin/brand/NewBrand';
            require([
                viewUrl
            ], function (newProductView) {
                //  check if this url not is a previous url
                if (APP.view) {
                    APP.view.undelegateEvents();
                }
                APP.view = new newProductView();
            });
        },

        showAllBrands: function () {
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var collectionUrl = 'collections/brands';
            var viewUrl = 'views/admin/brand/AllBrands';

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
        },

        showBrands: function (page, limit, sort, kind) {

            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            page = page || 1;
            limit = limit || 6;
            sort = sort || 'brandName';
            kind = kind || '+1';

            var collectionUrl = 'collections/brands';
            var viewUrl = 'views/admin/brand/AllBrands';

            var urlToServer = '/brand?expand=comments&page=' + page +               // must check on validity !!!!
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


        },

        updateBrand: function (brandId) {

            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var collectionUrl = 'collections/brands';
            var viewUrl = 'views/admin/brand/UpdateBrand';

            var urlToServer = '/brand/' + brandId;

            function viewCreator() {
                var collection = this;
                require([
                    viewUrl
                ], function (View) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                    console.log(collection);
                    APP.view = new View({
                        collection: collection
                    });
                });
            };

            require([
                collectionUrl
            ], function (Collection) {
                var collection = new Collection({url: urlToServer});
                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });


        },

//user
        showCreateUser: function () {
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var viewUrl = 'views/admin/user/NewUser';
            require([
                viewUrl
            ], function (newProductView) {
                if (APP.view) {
                    APP.view.undelegateEvents();
                }
                APP.view = new newProductView();
            });
        },

        showAllUsers: function () {
            console.log('showAllUsers router');
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var collectionUrl = 'collections/users';
            var viewUrl = 'views/admin/user/AllUsers';

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

        },

        showUsers: function (page, limit, sort, kind) {
            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            page = page || 1;
            limit = limit || 6;
            sort = sort || 'age';
            kind = kind || '+1';

            var collectionUrl = 'collections/users';
            var viewUrl = 'views/admin/user/AllUsers';

            var urlToServer = '/user?expand=comments&page=' + page +
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
        },

        updateUser: function(userId) {

            APP.history.push(Backbone.history.fragment);
            this.goToAdminPage();
            var collectionUrl = 'collections/users';
            var viewUrl = 'views/admin/user/UpdateUser';

            var urlToServer = '/user/' + userId;

            function viewCreator() {
                var collection = this;
                require([
                    viewUrl
                ], function (View) {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                    console.log(collection);
                    APP.view = new View({
                        collection: collection
                    });
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

    });
});