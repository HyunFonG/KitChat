var express = require('express');
var app = express();
var path = require('path');
var port = 8081;
var ChatMessage = require('./model/ChatMessage');

var server = app.listen(port,function(){
	console.log('Listening on port: ' + port);
});

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');
app.use(express.static('public'));

app.get('/',function(req,res){
	res.render('index');
});

app.get('/home',function(req,res){
	res.render('home');
})
app.get('/login',function(req,res){
	res.render('auth/login');
})

app.get('/chat',function(req,res){
	res.render('chat-page');
})

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
})
