// ---------------- Express Setup ------------------

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var app = express();

// ---------------- DB Connection ------------------

var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
var ChatMessage = require('./model/ChatMessage.js');

// ---------------- Listen Port ------------------

var port = 8081;
var server = app.listen(port,function(){
	console.log('Listening on port: ' + port);
});

// ---------------- Express Setting ------------------

app.use(express.static('public'));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// ---------------- Config Passport ------------------

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passport/init')(passport);

// ---------------- Routes ------------------

var routes = require('./routes/routes')(passport);
app.use('/',routes);

// ---------------- Socket IO ------------------

var io = require('socket.io').listen(server);

io.on('connection',function (socket) {
	// body...
	socket.on('chat', function(data) {
        // แสดงข้อมูลที่ได้ ออกมาทาง console
        console.dir(data);
        var current_time = (new Date()).getTime();
		var toSend = {username: data.username, group: data.group, message: data.message, create_at : current_time };
        ChatMessage(toSend).save();
        io.to(data.group).emit('message',toSend);
		// io.sockets.emit('message', toSend);

  	});

	socket.on('subscribe',function(data){
		console.log("SUBSCRIBE");
		console.dir(data);
		socket.join(data.room);
	})
})
