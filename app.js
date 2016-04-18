// ---------------- Express Setup ------------------

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var bCrypt = require('bcrypt-nodejs');
var app = express();

// ---------------- DB Connection ------------------

var dbConfig = require('./db.js')
var mongoose = require('mongoose');
var seeder = require('mongoose-seed');
seeder.connect(dbConfig.url,function(){

	seeder.loadModels([
		'./model/ChatMessage.js',
		'./model/Group.js',
		'./model/User.js',
		'./model/UserJoinedGroup.js'
	]);

	seeder.clearModels(['ChatMessage','Group','User','UserJoinedGroup'],function(){
		seeder.populateModels([
			{
				'model':'ChatMessage',
				'documents':[
					{
						'username':'aa',
						'group':'OK',
						'message': 'เอากับกูมั้ย',
						'create_at': new Date("1994-11-29")
					},
					{
						'username':'bb',
						'group':'OK',
						'message': 'เอา',
						'create_at': new Date("1994-11-30")
					}
				]
			},
			{
				'model':'Group',
				'documents':[
					{
						'name':'OK'
					},
					{
						'name':'OK2'
					}
				]
			},
			{
				'model':'User',
				'documents':[
					{
						'username':'aa',
						'password':bCrypt.hashSync('aa', bCrypt.genSaltSync(10), null)
					}
				]
			},
			{
				'model':'UserJoinedGroup',
				'documents':[
					{
						'username':'aa',
						'group':'OK',
						'joined_at': new Date('1994-11-28')
					}
				]
			}
		]);
	});
});
//mongoose.connect(dbConfig.url);
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
        //console.log(message);
        var current_time = (new Date()).getTime();
        ChatMessage({username: data.username, group: data.group, message: data.message, create_at : current_time }).save();
        io.sockets.in(data.group).emit('message', data.message);

  	});
})
