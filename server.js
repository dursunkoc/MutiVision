var express = require("express");
var stylus = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + "/server/views");
app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

if(env === "development"){
    mongoose.connect("mongodb://localhost/multivision");
}else{
    mongoose.connect("mongodb://mvusr:mvusr2@ds031701.mongolab.com:31701/multivision");
}
var db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error..."));
db.once('open', function(){
    console.log("multivision db opened!");
});
var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('Message',messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage=messageDoc.message;
});

app.get('/partials/:partialName', function (req, res) {
    res.render('partials/'+req.params.partialName);
});

app.get('*', function (req, res) {
    res.render('index',{
        message:mongoMessage
    });
});

var port = process.env.PORT || 3000;
var server = process.env.IP || "127.0.0.1";

app.listen(port);

console.log("Running on "+server+":"+port);