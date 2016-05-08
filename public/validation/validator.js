define([], function () {


    var validator = {

        isEmail: function(val) {
            var str = val.toString();
           if(!/(.+)@(.+){2,}\.(.+){2,}/.test(str)){

               return false
           }

            return true;
        },



        isAlphaNumeric: function (val) {
        var str = val.toString();
        if (!/^[a-zA-Z0-9]+$/.test(str)) {

            return false
        }
        return true
    },

        isValidPath: function(val) {
        var pattern = /^[a-zA-Z0-9/]+$/;

        return pattern.test(val);
    },

        isAlpha: function(val) {
        var str = val.toString();
        if (!/^[a-zA-Z]+$/.test(str)) {

            return false
        }
        return true
    },

        isNumeric: function(val) {
        if (!/^[0-9]+$/.test(val)) {
            return false;
        }
        return true;
    }
    }
    return validator;
});