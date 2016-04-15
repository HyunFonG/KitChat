var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user_joined_group = new Schema({
	username : String,
	group : String,
	joined_at : Date
});

var UserJoinedGroup = mongoose.model('UserJoinedRoom',user_joined_group);

module.exports = UserJoinedGroup;
