var mongoose = require("mongoose");
var encryption = require("../utilities/encryption");
var userSchema = mongoose.Schema(
    {
        firstName: {type: String, required: "{PATH} is required"},
        lastName: {type: String, required: "{PATH} is required"},
        userName: {type: String, required: "{PATH} is required", unique: true},
        salt: {type: String, required: "{PATH} is required"},
        hashed_password: {type: String, required: "{PATH} is required"},
        roles: [String]
    }
);
userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_password;
    },
    hasRole: function(role){
        return roles && roles.indexOf(role)>-1;
    }
};
var User = mongoose.model('User', userSchema);

module.exports.createDefaultUsers = function () {
    User.find({}).exec(function (err, resultSet) {
        if (resultSet.length == 0) {
            var salt = encryption.createSalt();
            var h_pwd = encryption.hashPwd(salt, "dursunkoc");
            User.create({
                firstName: "Dursun",
                lastName: "KOC",
                userName: "dursunkoc",
                salt: salt,
                hashed_password: h_pwd,
                roles: ['admin']
            });
            salt = encryption.createSalt();
            h_pwd = encryption.hashPwd(salt, "yaseminkoc");
            User.create({
                firstName: "Yasemin",
                lastName: "KOC",
                userName: "yaseminkoc",
                salt: salt,
                hashed_password: h_pwd,
                roles: []
            });
            salt = encryption.createSalt();
            h_pwd = encryption.hashPwd(salt, "elifnisakoc");
            User.create({
                firstName: "Elif Nisa",
                lastName: "KOC",
                userName: "elifnisakoc",
                salt: salt,
                hashed_password: h_pwd
            });
            salt = encryption.createSalt();
            h_pwd = encryption.hashPwd(salt, "asudekoc");
            User.create({
                firstName: "Asude",
                lastName: "KOC",
                userName: "asudekoc",
                salt: salt,
                hashed_password: h_pwd
            });
        }
    });
};