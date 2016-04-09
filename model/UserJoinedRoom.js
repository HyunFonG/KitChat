var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user_joined_room = new Schema({
	username : String,
	room : String,
	joined_at : Date
});

var UserJoinedRoom = mongoose.model('UserJoinedRoom',user_joined_room);

module.exports = UserJoinedRoom;