var mongoose = require("mongoose");

var logSchema = new mongoose.Schema({
	text: String,
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Log", logSchema);