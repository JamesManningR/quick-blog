var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: String,
	bio: String,
	projects: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project"
	}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
