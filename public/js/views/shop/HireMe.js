define([
    'backbone',
    'underscore',
    'text!templates/shop/hireMe.html',
    'models/hire'
], function(Backbone, _, hireMeTemplate, Hire) {

    var HireMe =  Backbone.View.extend({

        el: "#container",
        template: _.template(hireMeTemplate),

        events: {
            'click #sendHire': 'sendHire'
        },

        initialize: function() {
            this.render();
        },

        sendHire: function() {
            var name = $('#employerName').val();
            var companyName = $('#companyName').val();
            var replyEmail = $('#ReplyEmail').val();
            var message = $('#message').val();

            var hire = new Hire();

            hire.on('invalid', function(model, err){
                if(err === 'name'){
                    $('#nameDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('name must consists only characters');
                }
                if(err === 'company'){
                    $('#nameDiv').removeClass("has-error");
                    $('#companyNameDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('company name consists only characters and numeric');
                }
                if(err === 'message'){
                    $('#companyNameDiv').removeClass("has-error");
                    $('#messageDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('message length must be less than 300 symbols');
                }
            });

            hire.save({
                name: name,
                companyName: companyName,
                replyEmail: replyEmail,
                message: message
            },
                {
                    success: function (data) {
                        alert('success');
                        Backbone.history.navigate('#', {trigger: true});
                    },
                    error  : function (res, err) {
                        alert('error');
                    }
                }
            );



        },




        render: function() {
            console.log('from render in hireMe view');
            this.$el.html(this.template());
            $('#error').hide();
        }



    });

    return HireMe;
});