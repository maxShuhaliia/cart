define([
    'backbone',
    'underscore',
    'text!templates/auth/login.html',
    'models/transfer'
], function (Backbone, _, loginTemplate, transferModel) {

    var FooterView = Backbone.View.extend({

        el      : '#container',
        template: _.template(loginTemplate),

        initialize: function () {
            this.render();
        },

        events: {
            'click #signIn'  : 'onLogin',
            'click #register': 'onRegister'
        },

        onLogin: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var login = $('#email').val();
            var password = $('#password').val();

            var transfer = new transferModel();
            transfer.save({
                login   : login,
                password: password
            }, {
                success: function (data) {
                    alert('you are logged in');
                    Backbone.history.navigate('#brands', {trigger: true});
                },
                error  : function (res, err) {
                    console.log(err);
                    alert('error');
                }
            });

        },

        onRegister: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var navigateUrl = '#/register';
            Backbone.history.navigate(navigateUrl, {trigger: true});

        },


        render: function () {
            this.$el.html(this.template());
        },

    });

    return FooterView;
});
