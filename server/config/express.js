/**
 * Created by dursun on 1/18/15.
 */
var stylus = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");


module.exports = function(app, config){
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + "/server/views");
    app.set('view engine', 'jade');

    app.use(logger("dev"));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(session({secret:'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

    app.use(express.static(config.rootPath + '/public'));
};