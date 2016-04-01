// ---------------- Express Setup ------------------

var express = require('express');
var app = express();
var path = require('path');

// ---------------- DB Connection ------------------

var dbConfig = require('./db.js')
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
var ChatMessage = require('./model/ChatMessage.js');
var User = require('./model/User.js')

// ---------------- Listen Port ------------------

var port = 8081;
var server = app.listen(port,function(){
	console.log('Listening on port: ' + port);
});

// ---------------- Socket IO ------------------

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');
app.use(express.static('public'));

// ---------------- Routes ------------------

var routes = require('./routes/routes');
app.use('/',routes);


// ---------------- Socket IO ------------------

var io = require('socket.io').listen(server);

io.on('connection',function (socket) {
	// body...
	socket.on('chat', function(data) {
        // แสดงข้อมูลที่ได้ ออกมาทาง console
        //console.log(message);
        var current_time = (new Date()).getTime();
        ChatMessage({name: data.name, room: data.room, message: data.message, create_at : current_time }).save();
        io.emit('chat', data.name + " said : " + data.message);

    });

    socket.on('join', function(data) {
        // ส่งข้อมูลการ join room เข้ามา

    });

    socket.on('leave', function(data) {
        // ส่งข้อมูลการ leave room เข้ามา
        
    });
})
