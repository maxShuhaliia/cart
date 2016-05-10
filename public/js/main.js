var APP = APP || {};

require.config({
    paths: {
        backbone: './libs/backbone/backbone',
        jQuery: './libs/jquery/dist/jquery',
        slick: './libs/slick-carousel/slick/slick.min',
        migrateJs: '//code.jquery.com/jquery-migrate-1.2.1.min',
        underscore: './libs/underscore/underscore',
        models: './models',
        collections: './collections',
        views: './views',
        templates: '../templates',
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: ['underscore', 'jQuery'],
        slick: ['jQuery', 'migrateJs'],
        app: ['backbone', 'slick']
    }
});

require(['app'], function (app) {
    app.initialize();
});
