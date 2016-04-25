define([
    'backbone',
    'underscore',
    'text!templates/auth/register.html',
    'models/transfer'
], function (Backbone, _, registerTemplate, transferModel) {

    var FooterView = Backbone.View.extend({

        el      : '#container',
        template: _.template(registerTemplate),

        initialize: function () {
            this.render();
        },

        events: {
            'click #register': 'onRegister'
        },

        onRegister: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var login = $('#loginInput').val();
            var password = $('#password').val();
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var age = $('#age').val();
            var phoneNumber = $('#phoneNumber').val();
            var email = $('#email').val();

            var user = new transferModel();
            user.urlRoot = '/user'
            user.save({
                login      : login,
                password   : password,
                firstName  : firstName,
                lastName   : lastName,
                age        : age,
                phoneNumber: phoneNumber,
                email      : email
            }, {success: function(data) {
                alert('saved');
            },
                error: function(err) {
                    alert('error');
                }
            });

        },



        render: function () {
            this.$el.html(this.template());
        },

    });

    return FooterView;
});
