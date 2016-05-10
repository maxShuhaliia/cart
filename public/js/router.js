define([
    'backbone',
    'views/shop/MainShop',
    'underscore', 'text!templates/brands/products.html', 'views/admin/MainAdmin'
], function (Backbone, MainShop, _, productTemplate, MainAdmin) {

    return Backbone.Router.extend({

        routes: {
            ''                                                                                        : 'mainView',
            'login'                                                                                   : 'login',
            'register'                                                                                : 'register',
            'brands'                                                                                  : "goToBrands",
            'brand/page/:page/limit/:limit/sort/:sort/kind/:kind'                                     : 'changeBrandsView',
            'products/brand/:id'                                                                      : 'goToBrandWithProducts',
            'products/gender/:gender/category/:category/page/:page/limit/:limit/sort/:sort/kind/:kind': 'goToCategoryProducts',
            'products/new'                                                                            : 'goToNewProducts',

            'products/brandId/:id/page/:page/limit/:limit/sort/:sort/kind/:kind': 'changeProductView',
            'admin'                                                             : 'goToAdminPage',
            'admin/createProduct'                                               : 'showCreateProduct',
            'admin/allProducts'                                                 : 'showAllProducts',
            'admin/product/page/:page/limit/:limit/sort/:sort/kind/:kind'       : 'showProducts',
            'admin/updateProduct/:productId'                                    : 'updateProduct',
            'admin/createBrand'                                                 : 'showCreateBrand',
            'admin/allBrands'                                                   : 'showAllBrands',
            'admin/brand/page/:page/limit/:limit/sort/:sort/kind/:kind'         : 'showBrands',
            'admin/updateBrand/:id'                                             : 'updateBrand',
            'admin/createUser'                                                  : 'showCreateUser',
            'admin/allUsers'                                                    : 'showAllUsers',
            'admin/user/page/:page/limit/:limit/sort/:sort/kind/:kind'          : 'showUsers',
            'admin/updateUser/:id'                                              : 'updateUser',
            'hireMe'                                                            : "hireMe"
        },

        initialize: function () {
        },

        register: function () {
            this.mainView();
            require([
                'views/auth/Register'
            ], function (View) {
                if (APP.view) {
                    APP.view.undelegateEvents();
                }
                APP.view = new View();
            });
        },

        login: function () {
            this.mainView();
            require([
                'views/auth/Login'
            ], function (View) {
                if (APP.view) {
                    APP.view.undelegateEvents();
                }
                APP.view = new View();
            });

        },

        mainView: function () {
            if (APP.mainView) {
                APP.mainView.undelegateEvents();
            }
            APP.mainView = new MainShop();

        },

        goToBrands: function () {
            this.mainView();
            require([
                'views/shop/BrandsCategory'
            ], function (View) {
                if (APP.view) {
                    APP.view.undelegateEvents();
                }
                APP.view = new View();
            });
        },


        changeBrandsView: function (page, limit, sort, kind) {
            if (!APP.view) {
                this.goToBrands();
            }
            var urlToServer = '/brand?expand=comments&page=' + page +
                '&limit=' + limit + '&sort=' + sort + '&kind=' + kind;

            require([
                'collections/brands'
            ], function (Collection) {
                this.collection = new Collection({url: urlToServer});
                this.collection.fetch({reset: true});
                var self = this;
                this.collection.on('reset', function () {
                    APP.ObjectEvent.trigger('brandsFetched', self.collection);
                })
            });
        },

        changeProductView: function (brandId, page, limit, sort, kind) {

            var urlToServer = '/product?expand=comments&brandId=' + brandId + '&page=' + page +
                '&limit=' + limit + '&sort=' + sort + '&kind=' + kind;

            require([
                'collections/products'
            ], function (Collection) {
                this.collection = new Collection({url: urlToServer});
                this.collection.fetch({reset: true});
                var self = this;
                this.collection.on('reset', function () {
                    APP.ObjectEvent.trigger('productsFetched', self.collection);
                })
            });
        },

        goToNewProducts: function() {
            this.mainView();
            require([
                'views/shop/product/New'
            ], function(View) {
                if(APP.view){
                    APP.view.undelegateEvents();
                }
                APP.view = new View();
            });
        },

        goToCategoryProducts: function (gender, category, page, limit, sort, kind) {
            var self = this;
            page = page || 1;
            limit = limit || 6;
            sort = sort || 'price';
            kind = kind || 'desc';
            var urlToServerProducts = '/product/gender/' + gender + "?category=" + category + '&page=' + page +
                '&limit=' + limit + '&sort=' + sort + '&kind=' + kind;

            require([
                'views/shop/product/CategoryProducts'
            ], function (View) {

                if (APP.view && APP.view instanceof View) {
                    require([
                        'collections/products'
                    ], function (Collection) {
                        var collection = new Collection({url: urlToServerProducts});
                        collection.fetch({reset: true});
                        collection.on('reset', function () {
                            APP.ObjectEvent.trigger('productsFetched', this);
                        });
                    });
                } else {
                    if (APP.view) {
                        APP.view.undelegateEvents();
                    }
                    self.mainView();
                    var options;
                    if (gender === '0') {
                        options = {
                            url     : urlToServerProducts,
                            category: category
                        }
                    } else {
                        options = {
                            url     : urlToServerProducts,
                            category: gender
                        }
                    }
                    APP.view = new View(options);
                }
            });
        },

        goToBrandWithProducts: function (brandId) {
            APP.history.push(Backbone.history.fragment);
            this.mainView();
            require([
                'views/shop/BrandCategoryProducts'
            ], function (View) {
                if (APP.view) {
                    APP.view.undelegateEvents();
                }

                APP.view = new View(brandId);
            });
        },

        goToShopBrands: function (page, limit, sort, kind) {
            APP.history.push(Backbone.history.fragment);
            this.mainView();
            page = page || 1;
            limit = limit || 6;
            sort = sort || 'brandName';
            kind = kind || '1';

            var collectionUrl = 'collections/brands';
            var viewUrl = 'views/shop/brand/Brands';

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

///--------------------------------------------       for admin        --------------------------------------------
        goToAdminPage    : function () {
            if (APP.mainView) {
                APP.mainView.undelegateEvents();
            }
            APP.mainView = new MainAdmin();
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

        updateUser: function (userId) {

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


        },

        hireMe: function () {
            this.mainView();
            require([
                'views/shop/HireMe'
            ], function (View) {
                if (APP.view) {
                    APP.view.undelegateEvents();
                }

                APP.view = new View();
            })
        }

    });
});