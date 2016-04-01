var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('index');
});

router.get('/home',function(req,res){
	res.render('home');
});

router.get('/login',function(req,res){
	res.render('auth/login');
});

router.get('/chat',function(req,res){
	res.render('chat-page');
});

module.exports = router;