/**
 * Created by dursun on 2/5/15.
 */
var passport = require("passport");

module.exports.authenticate = function (req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({success: false});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(errr);
                }
                res.send({success: true, user: user});
            });
        }
    );
    auth(req, res, next);
};

module.exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(404);
        res.end();
    } else {
        next();
    }
};

module.exports.requiresRole =
    function (role) {
        return function (req, res, next) {
            if (req.user.roles.indexOf(role)==-1) {
                res.status(404);
                res.end();
            } else {
                next();
            }
        }
    };