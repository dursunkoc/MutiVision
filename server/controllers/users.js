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