/**
 * Created by dursun on 1/18/15.
 */
var path = require("path");
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development:{
        rootPath:rootPath,
        db:"mongodb://localhost/multivision",
        port:process.env.PORT || 3000
    },
    production:{
        rootPath:rootPath,
        db:"mongodb://mvusr:mvusr2@ds031701.mongolab.com:31701/multivision",
        port:process.env.PORT || 8080
    }
};