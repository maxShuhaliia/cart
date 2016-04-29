define([
    'backbone',
    'underscore',
    'text!templates/shop/headerMenu.html'
], function (Backbone, _, headerMenuTemplate) {

    var HeaderMenuView = Backbone.View.extend({
        template: _.template(headerMenuTemplate),
        el      : '#headerMenu',

        initialize: function () {
            this.render();
        },

        events: {
            'click .logo': 'goToHome',
            'click #login' : 'login',
            'click #signUp' : 'signUp',
        },

        render: function () {
            this.$el.html(this.template());
        },

        goToHome: function() {
            if(Backbone.history.fragment!==""){
               /// $("#mainContainer").empty();
                Backbone.history.navigate("", {trigger: true});
            }
        },
        login: function(e) {
            e.preventDefault();
            e.stopPropagation();

            var navigateUrl = '#/login';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
        signUp:function() {
            var navigateUrl = '#/register';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }

    });

    return HeaderMenuView;
});
