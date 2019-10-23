var express = require("express"),
	router = express.Router(),
	Post = require("../models/post"),
	User = require("../models/user"),
	Project = require("../models/project"),
	Post = require("../models/post"),
	Log = require("../models/log"),
	middleware = require("../middleware"),
	formatDate = require("../libs/formatDate");

//INDEX - show all Logs
router.get("/:postid", middleware.isLoggedIn, function (req, res) {
	Post.findById(req.params.postid)
		.populate("logs")
		.exec(function (err, foundPost) {
			if (err || !foundPost) {
				console.log(err);
			} else {
				res.locals.postid = req.params.postid;
				res.render("posts/edit", {
					logs: foundPost.logs,
					page: foundPost.title,
					post: foundPost,
					formatDate: formatDate
				});
			};
		})
});

//POST - Create a new post
router.post("/", middleware.isLoggedIn, function (req, res) {
	Project.findById(req.body.id, function (err, project) {
		if (err || !project) {
			console.log(err);
			res.redirect('.../profile/' + req.user.id);
		} else {
			var title = req.body.postName,
				date = new Date();

			var newPost = {
				title,
				date,
				project
			};

			Post.create(newPost, function (err, newlyCreated) {
				if (err) {
					console.log(err);
				} else {
					project.posts.push(newlyCreated);
					project.save();

					console.log("Post %s has been added to the a project", newlyCreated.title);

					res.redirect(req.get('referer'));
				}
			});
		}
	});
});

router.delete("/:id", function (req, res){
	middleware.destroyPost(req.params.id);
	res.send("Project and all logs deleted.")
});

module.exports = router;
