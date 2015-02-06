/**
 * Created by dursun on 2/5/15.
 */
var passport = require("passport");

module.exports.authenticate = function(req, res, next){
    var auth = passport.authenticate('local', function(err, user){
            if(err){return next(err);}
            if(!user){res.send({success:false});}
            req.logIn(user, function(err){
                if(err){return next(errr);}
                res.send({success:true, user:user});
            });
        }
    );
    auth(req, res, next);
};