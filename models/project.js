var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
	name: String,
	startDate: Date,
	lastUpdate: Date,
	status: {type: Number, default: 1},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
});

module.exports = mongoose.model("Project", projectSchema);