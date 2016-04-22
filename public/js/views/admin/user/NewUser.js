define([
    'backbone',
    'underscore',
    'text!templates/admin/user/newUserTemplate.html',
    'models/user'
], function (Backbone, _, newUserTemplate, UserModel) {

    var newProductAdminView = Backbone.View.extend({
        template: _.template(newUserTemplate),
        el      : '#content',

        events: {
            'click #createUserBtn'    : "createUser",
            'click #createUserBtnHide': 'hideCreateUser',
            'click #allUsers'         : "allUsers"
        },

        initialize: function () {
            console.log('inititalize from view');
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },

        createUser: function () {
            var login = $('#login').val();
            var password = $('#password').val();
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var age = $('#age').val();
            var phoneNumber = $('#phoneNumber').val();
            var email = $('#email').val();
            var isAdmin = +$('#isAdmin').val();

            var userModel = new UserModel({
                login      : login,
                password   : password,
                firstName  : firstName,
                lastName   : lastName,
                age        : age,
                phoneNumber: phoneNumber,
                email      : email,
                isAdmin    : isAdmin
            });
            userModel.save();
        },

        hideCreateUser: function () {
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }
    });

    return newProductAdminView;
});
