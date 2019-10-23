var express = require("express"),
	router = express.Router(),
	User = require("../models/user"),
	Project = require("../models/project"),
	middleware = require("../middleware"),
	multer = require("multer"),
	path = require("path"),
	crypto = require("crypto"),
	fs = require("fs");

//Image uploader (multer)
//Set Storage Engine---------------------------------------
const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function (req, file, cb) {
		cb(null, generateFileName(file.fieldname, path.extname(file.originalname)));
	}
});

//Generate file string
function generateFileName(fieldname, exttype) {
	var generatedName = `${fieldname}-${crypto.pseudoRandomBytes(8).toString('hex')}${exttype}`;

	while (fs.existsSync('./public/uploads' + generatedName)) {
		generatedName = `${fieldname}-${crypto.pseudoRandomBytes(8).toString('hex')}${exttype}`;
	}
	return generatedName;
}


//IMAGE UPLOAD
//Init Upload
const upload = multer({
	storage: storage,
	limits: {
		filesize: 1000000
	},
	fileFilter: function (req, file, cb) {
		middleware.checkFileType(file, cb);
	}
});


//SHOW - Show the users page
//MIDDLEWARE
//checkUserOwnership - Checks if the user owns the page that they are trying to access
router.get("/:id", middleware.checkUserOwnership, function (req, res) {
	User.findById(req.params.id)
		.populate({
			path: 'projects',
			populate: {
				path: 'posts'
			}
		})
		.exec(function (err, foundUser) {
			if (err || !foundUser) {
				console.log(err);
			} else {

				if (err) {
					console.log(err);
				} else {
					res.render("profile/show", {
						page: foundUser.username + "'s workshop",
						user: foundUser,
						projects: foundUser.projects
					});
				}
			};
		});
});

//EDIT 
router.get("/:id/edit", function (req, res) {
	User.findById(req.params.id, (err, foundUser) => {
		if (err || !foundUser) {
			console.log(err);
		} else {
			Project.find().where("author.id").equals(foundUser.id).exec((
				err, projects) => {
				if (err) {
					console.log(err);
				} else {
					res.render("profile/edit", {
						page: "Edit" + foundUser.username,
						user: foundUser
					});
				}
			})
		};
	});
});

//UPDATE
//Update general
router.put("/:id", middleware.isLoggedIn, (req, res) => {
	console.log('hi from put');
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, foundUser) => {
		if (err || !foundUser) {
			return res.send('There was an issue with uploading your file.');
		} else {
			res.redirect("/profile/" + req.user.id);
		}
	});
});

//Update Avatar
router.put("/img/:id", middleware.isLoggedIn, upload.single('avatar'), (req, res) => {
	var updateUser = {
		avatar: req.file.path.substr(6)
	};
	User.findByIdAndUpdate(req.params.id, updateUser, (err, foundUser) => {
		if (err || !foundUser) {
			return res.send('There was an issue with uploading your file.');
		} else {
			res.redirect("/profile/" + req.user.id);
		}
	});
});

router.delete("/:id", function (req, res) {
	middleware.destroyUser(req.user.id);
	res.send("User Deleted.");
});

module.exports = router;