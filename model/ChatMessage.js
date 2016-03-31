var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myappdatabase');
var Schema = mongoose.Schema;

var chatMessageSchema = new Schema({
	name: String,
	room: String,
	message: String,
	create_at: Date
});

var ChatMessage = mongoose.model('ChatMessage',chatMessageSchema);

module.exports = ChatMessage;