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

        sendHire: function(e) {
            var name = $('#employerName').val();
            var companyName = $('#companyName').val();
            var replyEmail = $('#ReplyEmail').val();
            var message = $('#message').val();

            var hire = new Hire();

            hire.on('invalid', function(model, err){
                if(err === 'name'){
                    clearErrors();
                    $('#nameDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('name must consists only characters');
                }
                if(err === 'company'){
                    clearErrors();
                    $('#companyNameDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('company name consists only characters and numeric');
                }
                if(err === 'message'){
                    clearErrors();
                    $('#messageDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('message length must be less than 300 symbols');
                }
                if(err === 'email'){
                    clearErrors();
                    $('#emailDiv').addClass("has-error");
                    $('#error').show();
                    $('#errorMessage').html('wrong email!!! please correct it');
                }
                function clearErrors(){
                    $('#nameDiv').removeClass("has-error");
                    $('#companyNameDiv').removeClass("has-error");
                    $('#emailDiv').removeClass("has-error");
                    $('#messageDiv').removeClass("has-error");
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
                        $('#error').hide();
                        $('#hireForm').html("<div class='alert alert-success' role='alert'>Your message was delivered!!! I'll be in touch</div>");
                        setTimeout(function(){
                            Backbone.history.navigate('#', {trigger: true});
                        }, 4000);
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