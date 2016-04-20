define([
    'backbone',
    'jQuery',
    'router'
], function(Backbone, $, Router){
    function init(){

        APP.ObjectEvent = {};
        APP.channel = _.extend(APP.ObjectEvent, Backbone.Events);

        var router = new Router({channel:  APP.channel});
        var url = window.location.hash;
      //  APP.router = router;


        Backbone.history.start();
        Backbone.history.fragment = '';
        Backbone.history.navigate(url, {trigger: true});



    }


    return {
        initialize: init
    }
});
