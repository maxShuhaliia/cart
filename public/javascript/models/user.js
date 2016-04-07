//var Model = Backbone.Model.extend({
//    idAttribute: '_id',   ///трекаэ по айды
//
//    initialize: function(options){
//        this.a = options.a;
//    },
//
//    parse: function(resp){
//        console.log(resp.a);
//        resp.a = 500;
//
//        return  resp;
//    },
//
//    urlRoot: function(){
//        return '/user';
//    }
//});
//
//var user = new Model({a : 100});
//
////emuliatsia
//var user = new Model( {a : 100, _id: 'pupkin'} );


var Model = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: function () {
        return '/user/';
    },

    parse: function (resp) {
        //  console.log("from parse in model");
        console.log(resp);
        resp.b = 1000;
        return resp;
    },

    defaults: {
        firstName: "Vasiok"
    },
    validate: function (attrs) {
    if(attrs.age){
        if(attrs.age < 18) {
            return 'This service available only for > 18 '
        }
}
        return false;
        //if true return - model not valid and willn't saved
    },
    initialize: function (options) {
        this.login = options.login;
        this.password = options.password;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.age = options.age;
        this.phoneNumber = options.phoneNumber;
        this.email = options.email;

        this.on('invalid', function(model, err) {
            console.log("err " + err);
            console.log("invalid model ");
        });
        //concrete change
        this.on('change:firstName', function() {
            console.log("first name was changed");
        });
        this.on('change', function() {
            console.log("was changed");
        });


    }
});

var model = new Model({
    _id: '5703a6bb315c194c0e11be55',
    login: "m",
    password: "m",
    // firstName: "f",
    lastName: "l",
    age: 17,
    phoneNumber: 0987654321,
    email: "shuhaliia@gmail.com"
});



//, {parse: true}