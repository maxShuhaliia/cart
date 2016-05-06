define([
    'backbone',
    'underscore',
    'text!templates/shop/footerTemplate.html'
], function (Backbone, _, footerTemplate) {

    var FooterView = Backbone.View.extend({
        template: _.template(footerTemplate),
        el: '#footer',

        initialize: function () {
            this.render();
        },

        events: {
            'click #hireMe': 'hireMe'
        },

        render: function() {
            this.$el.html(this.template());
        },

        hireMe: function() {
            if(Backbone.history.fragment !== "hireMe"){
                var url = '#hireMe';
                this.$el.empty();
                Backbone.history.navigate(url, {trigger: true});
            }

        }

    });

    return FooterView;
});
