var crypto = require("crypto");

module.exports.createSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

module.exports.hashPwd = function (salt, pwd) {
    var hamc = crypto.createHmac('sha1', salt);
    return hamc.update(pwd).digest('hex');
};