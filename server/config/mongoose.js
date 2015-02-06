/**
 * Created by dursun on 1/18/15.
 */

var mongoose = require("mongoose");
var crypto = require("crypto");

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error..."));
    db.once('open', function () {
        console.log("multivision db opened!");
    });

    var userSchema = mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            userName: String,
            salt: String,
            hashed_password: String
        }
    );
    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hashed_password;
        }
    };
    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, resultSet) {
        if (resultSet.length == 0) {
            var salt = createSalt();
            var h_pwd = hashPwd(salt, "dursunKoc");
            User.create({
                firstName: "Dursun",
                lastName: "KOC",
                userName: "dursunKoc",
                salt: salt,
                hashed_password: h_pwd
            });
            salt = createSalt();
            h_pwd = hashPwd(salt, "yaseminKoc");
            User.create({
                firstName: "Yasemin",
                lastName: "KOC",
                userName: "yaseminKoc",
                salt: salt,
                hashed_password: h_pwd
            });
            salt = createSalt();
            h_pwd = hashPwd(salt, "elifNisaKoc");
            User.create({
                firstName: "Elif Nisa",
                lastName: "KOC",
                userName: "elifNisaKoc",
                salt: salt,
                hashed_password: h_pwd
            });
            salt = createSalt();
            h_pwd = hashPwd(salt, "asudeKoc");
            User.create({
                firstName: "Asude",
                lastName: "KOC",
                userName: "asudeKoc",
                salt: salt,
                hashed_password: h_pwd
            });
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hamc = crypto.createHmac('sha1', salt);
    return hamc.update(pwd).digest('hex');
}