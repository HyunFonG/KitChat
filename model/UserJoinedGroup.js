var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user_joined_group = new Schema({
	username : String,
	group : String,
	joined_at : Date
},{ collection: 'user_joined_group' });

var UserJoinedGroup = mongoose.model('UserJoinedGroup',user_joined_group);

module.exports = UserJoinedGroup;
