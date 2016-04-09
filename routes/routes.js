var express = require('express');
var Group = require('../model/Group');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/login');
}

module.exports = function (passport) {

	router.get('/',function(req,res){
		res.render('index');
	});

	router.get('/home',function(req,res){
		res.render('home');
	});

	router.route('/login')
		.get(function(req,res){
			res.render('auth/login');
		})
		.post(passport.authenticate('login', {
			successRedirect: '/chat',
			failureRedirect: '/login',
			failureFlash : true
		}));
	router.route('/register')
		.get(function(req,res){

			res.render('auth/register');
		})
		.post(passport.authenticate('signup', {
			successRedirect: '/login',
			failureRedirect: '/register',
			failureFlash : true
		}));

	router.get('/chat',isAuthenticated,function(req,res){
		var grouplist = Group.find({}).select({name:1,_id:0}).exec(function(err,group){
			res.render('chat-page',{grouplist : group});
		})
	});

	router.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});

	router.get('/createGroup',function(req,res){
		console.log(req.query.name);
		Group.findOne({ 'name' :  req.query.name }, function(err, user) {
				// In case of any error, return using the done method
				if (err){
						console.log('Error in SignUp: '+err);
						return done(err);
				}
				// already exists
				if (user) {
						console.log('Group already exists');
						return done(null, false, req.flash('message','Group Already Exists'));
				} else {
						Group({name : req.query.name}).save();

				}
		});
	});

	return router;
}
