define([
    'backbone',
    'models/user'
], function(Backbone, Model){
    var Collection = Backbone.Collection.extend({
        model: Model,
        url: '/user/',

        initialize: function(options){
            if(options && options.url){
                this.url = options.url;
            }

            this.on('add', function(){
                console.log('Added one model');
            });
            this.on('change', function(){
                console.log('Changed one model in collection');
            });
            this.on('remove', function(){
                console.log('Removed one model');
            });
            this.on('update', function(){
                console.log('Updated collection');
            });
            this.on('reset', function(){
                console.log('Reset collection');
            });
        }
    });

    return Collection;
});