define([
    'backbone',
    'underscore',
    'text!templates/admin/user/updateUserTemplate.html',
    'models/user'
], function (Backbone, _, updateUserTemplate, UserModel) {

    var UpdateUserAdminView = Backbone.View.extend({
        template: _.template(updateUserTemplate),
        el      : '#content',

        events: {
            'click #updateUserBtn'    : "updateUser",
            'click #updateUserBtnHide': 'hideUpdateUser',
        },

        initialize: function () {
            this.user = this.collection.at(0);
            this.render();

            $('#login').val(this.user.login);
            $('div#isAdmin select').val(this.user.isAdmin);

            $('#password').val(this.user.password);
            $('#firstName').val(this.user.firstName);
            $('#lastName').val(this.user.lastName);
            $('#age').val(this.user.age);
            $('#phoneNumber').val(this.user.phoneNumber);
            $('#email').val(this.user.email);
            $('#photo').attr('src', this.user.pathToPhoto);

        },

        render: function () {
            console.log('render   ', this.collection);
            this.$el.html(this.template({collection:  this.collection}));
        },

        updateUser: function () {
            var login = $('#login').val();
            var password = +$('#password').val();
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();

            var age = $('#age').val();
            var phoneNumber = $('#phoneNumber').val();
            var email = $('#email').val();
            var isAdmin = $('#isAdmin').val();


            if(login !== this.user.login) {
                this.user.set({'login': login});
            };
            if(password !== this.user.password) {
                this.user.set({'password': password});
            };
            if(firstName !== this.user.firstName) {
                this.user.set({'firstName': firstName});
            };
            if(lastName !== this.user.lastName) {
                this.user.set({'lastName': lastName});
            };
            if(age !== this.user.age) {
                this.user.set({'age': age});
            };
            if(phoneNumber !== this.user.phoneNumber) {
                this.user.set({'phoneNumber': phoneNumber});
            };
            if(email !== this.user.email) {
                this.user.set({'email': email});
            };
            if(isAdmin !== this.user.isAdmin) {
                this.user.set({'isAdmin': isAdmin});
            };

            this.user.save();
            $("#content").empty();

            Backbone.history.navigate(APP.prevUrl, {trigger: true});
        },

        hideCreateProduct: function() {
            this.$el.empty();
            var navigateUrl = '#admin';
            Backbone.history.navigate(navigateUrl, {trigger: true});
        }
    });

    return UpdateUserAdminView;
});
