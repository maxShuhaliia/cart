var Collection = Backbone.Collection.extend({
    model: Model,
    url: '/user/'
});

var users = new Collection();
users.fetch();