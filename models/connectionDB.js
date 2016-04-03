/**
 * Created by Max on 31.03.2016.
 */
var mongoose = require('mongoose');


module.require = (function() {
    require('../config/' + process.env.NODE_ENV);
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('connected',function () {
        return mongoose;
    });
    mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT );
})();