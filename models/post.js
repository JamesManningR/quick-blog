var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	title: String,
	date: Date,
	logs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Log"
	}],
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
	}
});

module.exports = mongoose.model("Post", postSchema);
