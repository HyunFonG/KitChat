var express = require('express');
var Group = require('../model/Group');
var UserJoinedGroup = require('../model/UserJoinedGroup');
var ChatMessage = require('../model/ChatMessage');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/login');
};

module.exports = function (passport) {

	router.get('/',function(req,res){
		res.redirect('/login');
		// res.render('index');
	});

	router.get('/partials/:name',function(req,res){
		var name = req.params.name;
   		res.render('partials/' + name);
	});

	router.get('/home',function(req,res){
		res.render('home');
	});

	router.route('/login')
		.get(function(req,res){
			res.render('auth/login',{message:req.flash('message')});
			// console.log("MESSAGE",req.flash('message'));
		})
		.post(passport.authenticate('login', {
			successRedirect: '/chat',
			failureRedirect: '/login',
			failureFlash : true
		}));
	router.route('/register')
		.get(function(req,res){
			res.render('auth/register',{message:req.flash('message')});
		})
		.post(passport.authenticate('signup', {
			successRedirect: '/login',
			failureRedirect: '/register',
			failureFlash : true
		}));

	router.get('/chat',isAuthenticated,function(req,res){
		res.render('index');
	});

	router.get('/logout',isAuthenticated,function(req,res){
		req.logout();
		res.redirect('/login');
	});

	// API LIST
	router.get('/api/user',isAuthenticated,function(req,res){
		res.json({"username":req.user.username});
	});

	router.get('/api/group',isAuthenticated,function(req,res){
		Group.find({},function(err,group){
			// console.log('-------------');
			UserJoinedGroup.find({'username':req.user.username},function(err,joinedgroup){
				var joined_group = [];
				var unjoinedgroup = [];
				for(var i = 0;i < joinedgroup.length;i++){
					joined_group.push(joinedgroup[i].group);
				}
				for(var i = 0;i < group.length;i++){
					if(joined_group.indexOf(group[i].name) == -1){
						unjoinedgroup.push(group[i]);
					}
				}
				res.json({'unjoinedgroup':unjoinedgroup,'joinedgroup':joinedgroup});
			});
		});
	});

	router.post('/api/group/create',isAuthenticated,function(req,res){
		Group.findOne({ 'name' :  req.body.groupname }, function(err, user) {
				// In case of any error, return using the done method
				if (err){
					// console.log('Error in SignUp: '+err);
					return done(err);
				}
				// already exists
				if (user) {
					// console.log('Group already exists');
					return done(null, false, req.flash('message','Group Already Exists'));
				} else {
					Group({name : req.body.groupname}).save();
					res.json({'sender_username':req.user.username});
					// res.redirect('/chat');
				}
		});
	});

	router.post('/api/group/join',isAuthenticated,function(req,res){
		var current_time = (new Date()).getTime();
		UserJoinedGroup({'username':req.user.username,group:req.body.group,'joined_at':current_time}).save();
		res.json({status:'join success'});
	});

	router.post('/api/group/leave',isAuthenticated,function(req,res){
		UserJoinedGroup.remove({'username':req.user.username,group:req.body.group},function(err){
			if(!err) res.json({'status':'REMOVED'});
		});
	});

	router.post('/api/group/message',isAuthenticated,function(req,res){
		UserJoinedGroup.findOne({'username':req.user.username,'group':req.body.groupname},function(err,ujg){
				ChatMessage.find({'group':req.body.groupname,'create_at':{$gt: ujg.joined_at}}).sort('create_at').exec(function(err,msg){
					res.json({'message':msg,'cur_user':req.user.username});
				});
		});
	});

	return router;
};
