
module.exports = (function() {
    function isAlphaNumeric(val) {
        var str = val.toString();
        if (!/^[a-zA-Z0-9]+$/.test(str)) {

            return false
        }
        return true
    }

    function isAlpha(val) {
        var str = val.toString();
        if (!/^[a-zA-Z]+$/.test(str)) {

            return false
        }
        return true
    }

    function isNumeric(val) {
        if (!/^[0-9]+$/.test(val)) {
            console.log("from isNumeric");
            return false;
        }
        return true;
    }

    return {
        isAlphaNumeric : isAlphaNumeric,
        isAlpha        : isAlpha,
        isNumeric      : isNumeric
    }
})();