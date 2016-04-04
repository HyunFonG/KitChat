var express = require('express');
var router = express.Router();

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
			successRedirect: '/home',
			failureRedirect: '/login',
			failureFlash : true  
		}));
	router.route('/register')
		.get(function(req,res){
			res.render('auth/register');
		})
		.post(passport.authenticate('signup', {
			successRedirect: '/home',
			failureRedirect: '/register',
			failureFlash : true  
		}));

	router.get('/chat',function(req,res){
		res.render('chat-page');
	});

	router.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});

	return router;
}