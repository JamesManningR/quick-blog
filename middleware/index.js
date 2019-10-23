var User = require("../models/user"),
	Project = require("../models/project"),
	Post = require("../models/post"),
	Log = require("../models/log"),
	path = require("path");


var middlewareObj = {

	//Is Logged in Middleware
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect("/login");
	},

	checkUserOwnership: function (req, res, next) {
		//If user is logged in
		if (req.isAuthenticated()) {
			//Get the user
			User.findById(req.user._id, function (err, foundUser) {
				if (err) {
					res.redirect("back");
				} else {
					//If user owns comment
					if (foundUser._id.equals(req.user._id)) {
						//Take them to the edit page
						next();
					} else {
						res.redirect("back");
					}
				}
			});
		} else {
			res.redirect("/login");
		}
	},

	checkProjectOwnership: function (req, res, next) {
		//If user is logged in
		if (req.isAuthenticated()) {
			//Get the project
			Project.findById(req.params.projectid, function (err, foundProject) {
				if (err) {
					res.redirect("back");
				} else {
					//If user owns comment
					if (foundProject.author.id.equals(req.user._id)) {
						//Take them to the edit page
						next();
					} else {
						res.redirect("back");
					}
				}
			});
		} else {
			res.redirect("/login");
		}
	},

	destroyLog: function (logID, next) {
		Log.findOneAndDelete(logID, function (err, foundlog) {
			if (err) {
				console.log(err);
			}
		})
	},

	destroyPost: function (postID) {
		let post = Post.findById(postID);
		post
			.populate("logs")
			.exec(function (err, foundPost) {
				foundPost.logs.forEach(function (log) {
					middlewareObj.destroyLog(log.id);
					foundPost.remove();
				});
			})
		post.remove()
	},

	destroyProject: function (projectID) {
		let project = Project.findById(projectID);
		project
			.populate("posts")
			.exec(function (err, foundProject) {
				foundProject.posts.forEach(function (post) {
					middlewareObj.destroyPost(post.id);
					foundProject.remove();
				});
			})
		project.remove();

	},

	destroyUser: function (userID) {
		let user = User.findById(userID);
		user
			.populate("projects")
			.exec(function (err, foundUser) {
				foundUser.projects.forEach(function (project) {
					middlewareObj.destroyProject(project.id);
					foundUser.remove();
				});
			})
		user.remove();
	},
	
	//Check File Type
	checkFileType: function(file, cb) {
	//Allowed types
	const fileTypes = /jpeg|jpg|png/;
	// Check extension
	const extName = path.extname(file.originalname);
	//Check Mime
	const mimetype = fileTypes.test(file.mimetype);

	if (mimetype && extName) {
		return cb(null, true);
	} else {
		cb('Error: Incorrect type')
	}
}
};

module.exports = middlewareObj;
