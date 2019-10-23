var express = require("express"),
	router = express.Router(),
	Project = require("../models/project"),
	Post = require("../models/post"),
	User = require("../models/user"),
	Log = require("../models/log"),
	middleware = require("../middleware"),
	formatDate = require("../libs/formatDate");

router.post("/", middleware.isLoggedIn, function (req, res) {
	Post.findById(req.body.postID)
		.populate('project')
		.exec(function (err, post) {
			if (err || !post) {
				console.log(err);
				res.send("No post with this ID found");
			} else {
				var text = req.body.text,
					date = new Date();

				var newLog = {
					text,
					date
				};

				Log.create(newLog, function (err, newlyCreated) {
					if (err) {
						console.log(err);
					} else {
						post.logs.push(newlyCreated);
						post.save();

						console.log("Log %s has been added to the a post", newlyCreated.date);

						var projectUpdate = {
							lastUpdate: new Date()
						};

						Project.findByIdAndUpdate(post.project._id, projectUpdate, (err, foundProject) => {
							if (err || !foundProject) {
								console.log(err);
							}
						});

						var responseText = formatDate.default(newlyCreated.text, newlyCreated.date);

						var responseObject = {
							text: responseText,
							id: newlyCreated.id
						}

						res.send(responseObject);
					}
				});
			}
		});
});

router.delete("/:logID", function (req, res) {
	middleware.destroyLog(req.params.logID);
	res.send("Log Deleted.")
});

module.exports = router;
