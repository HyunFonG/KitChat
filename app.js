var express = require('express');
var app = express();
var path = require('path');
var port = 8081;

var server = app.listen(port,function(){
	console.log('Listening on port: ' + port);
});

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');
app.use(express.static('public'));

app.get('/',function(req,res){
	res.render('index');
});

var io = require('socket.io').listen(server);

io.on('connection',function (socket) {
	// body...
	socket.on('chat', function(message) {
        // แสดงข้อมูลที่ได้ ออกมาทาง console
        //console.log(message);
        io.emit('chat', message.name + " said : " + message.message);

    });
})