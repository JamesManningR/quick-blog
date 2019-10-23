var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user"),
	middleware = require("../middleware");

//Landing Page
router.get("/", function (req, res) {
	res.render("index");
});

//Login Form
router.get("/login", function (req, res) {
	res.render("login");
});

//Register Page
router.get("/register", function (req, res) {
	res.render("register");
});

//Create user
router.post("/register", function (req, res) {
	//Crate new User Object
	User.register(new User({
		username: req.body.username
	}), req.body.password, function (err, user) {
		if (err) {
			return res.render("register", {
				"error": err.message
			});
		} else {
			passport.authenticate("local")(req, res, function () {
				console.log("User %s has created an account and has logged in", req.body.username);
				res.redirect(`/profile/${user.id}`);
			});
		}
	});
});

// login logic: app.post("/login", middleware, callback)
router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		//If user is not there
		if (!user) {
			console.log("%s failed to log in", req.body.username);
			return res.redirect('/login');
		}
		req.logIn(user, err => {
			if (err) {
				return next(err);
			}
			console.log("User %s has logged in", req.user.username);
			let redirectTo = req.session.redirectTo ? req.session.redirectTo : `/profile/${req.user.id}`;
			delete req.session.redirectTo;
			res.redirect(redirectTo);
		});
	})(req, res, next);
});

// logout route
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/login");
});


module.exports = router;
