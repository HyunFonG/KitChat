var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myappdatabase');
var Schema = mongoose.Schema;

var chatMessageSchema = new Schema({
	name: String,
	room: String,
	message: String,
	timestamp: Date
});

var ChatMessage = mongoose.model('ChatMessage',chatMessageSchema);

module.exports = ChatMessage;