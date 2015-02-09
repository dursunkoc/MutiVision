var mongoose = require("mongoose");
var encryption = require("../utilities/encryption");
User = mongoose.model("User");

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
        res.end();
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.salt = encryption.createSalt();
    userData.userName = userData.userName.toLowerCase();
    userData.hashed_password = encryption.hashPwd(userData.salt, userData.password);
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf("E11000") > -1) {
                err = "User already registered!";
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }

        req.logIn(user, function (err) {
            if (err) {
                next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res, next) {
    var userUpdates = req.body;
    if(userUpdates._id != req.user._id && !req.user.hasRole('admin')){
        res.status(403);
        res.end();
    }
    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.userName = userUpdates.userName;
    if(userUpdates.password){
        req.user.salt = encryption.createSalt();
        req.user.hashed_password = encryption.hashPwd(req.user.salt, userUpdates.password);
    }
    req.user.save(function(err){
        if (err) {
            if (err.toString().indexOf("E11000") > -1) {
                err = "User already registered!";
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(req.user);
    });
};