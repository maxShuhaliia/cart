
module.exports = (function() {
    function isLoggedIn(req, res, next) {
        console.log("from isLoggedIn ");
        if ( req.isAuthenticated() ) {
            return next();
        }
        res.redirect('/login');
    }
    return {
        isLoggedIn : isLoggedIn
    }
})();