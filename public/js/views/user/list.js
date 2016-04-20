define([
    'backbone',
    'collections/user', 'underscore', 'text!../../../templates/user.html'
], function (Backbone, Users, _, userTemplate) {

    var ViewUser = Backbone.View.extend({

        attributes: {
            'data-name': 'temp'
        },
        template: _.template(userTemplate),

        initialize: function () {
            //var self = this;
            //this.userList = new Users();
            //this.userList.fetch({
            //    reset: true,
            //    success: function (data) {
            //        self.render(data);
            //    }
            //});
        },

        events: {
            'click #getUsers': function (event) {
                var self = this;
                this.userList = new Users();

                this.userList.fetch({
                    reset: true,
                    success: function (data) {
                        self.render(data);
                    }
                });
            }
        },

        render: function (data) {

            this.$el.html(this.template({users: data.toJSON()}));
            return this;
        }
    });

    return ViewUser;
});
