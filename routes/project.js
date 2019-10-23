var express = require("express"),
	router = express.Router(),
	User = require("../models/user"),
	Project = require("../models/project"),
	Post = require("../models/post"),
	Log = require("../models/log"),
	middleware = require("../middleware"),
	formatDate = require("../libs/formatDate");

//CREATE - add new project to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
	User.findById(req.user.id, function (err, user) {
		if (err) {
			console.log(err);
			res.redirect(".../login");
		} else {
			
			var name = req.body.projectName,
				startDate = new Date(),
				lastUpdate = new Date(),
				author = user;
			
			var newProject = {
				name,
				startDate,
				lastUpdate,
				author
			};

			// Create a new project and save to DB
			Project.create(newProject, function (err, newlyCreated) {
				if (err) {
					console.log(err);
				} else {
					user.projects.push(newlyCreated);
					user.save();

					console.log("Project %s has been created by user id %s", newlyCreated.name, req.user.id);

					res.redirect("/profile/" + req.user.id);
				}
			});
		}
	});
});

//SHOW - Show a specific project page
router.get("/:id", function (req, res) {
	Project.findById(req.params.id)
		.populate({
			path: 'posts',
				populate: {
					path: 'logs'
				}
		})
		.populate("author")
		.exec(function (err, foundProject) {
		var author = "";
			if (err || !foundProject) {
				console.log(err);
			} else {
				Post.find().where("author.id")
					.equals(foundProject.id)
					.exec((
						err, projects) => {
						if (err) {
							console.log(err);
						} else {
							res.render("projects/show", {
								page: foundProject.name,
								project: foundProject,
								projectAuthor: foundProject.author.username,
								posts: foundProject.posts,
								formatDate
							});
						}
					})
			}
		});
});

//UPDATE
//Update general
router.put("/:id", middleware.isLoggedIn, (req, res) => {
	Project.findByIdAndUpdate(req.params.id, req.body.project, (err, foundProject) => {
		if (err || !foundProject) {
			return res.send('There was an issue with uploading your file.');
		} else {
			res.redirect("/profile/" + req.user.id);
		}
	});
});

router.delete("/:id", function (req, res){
	middleware.destroyProject(req.params.id);
	res.send("Project Deleted.");
});

module.exports = router;
