var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chatMessageSchema = new Schema({
	username: String,
	room: String,
	message: String,
	create_at: Date
});

var ChatMessage = mongoose.model('ChatMessage',chatMessageSchema);

module.exports = ChatMessage;