const express = require("express"),
	app = express(),
	passport = require("passport"),
	mongoose = require("mongoose"),
	LocalStrategy = require("Passport-local"),
	LocalStrategyMongoose = require("Passport-local-mongoose"),
	methodOverride = require("method-override"),
	bodyParser = require("body-parser"),
	multer = require("multer"),
	consoleStamp = require("console-stamp")(console, {
		pattern: 'hh:MM:ss',
		label: false
	}),
	User = require("./models/user"), //Import models
	Project = require("./models/project"),
	Post = require("./models/post"),
	Log = require("./models/log"),
	PORT = process.env.PORT,
	IP = process.env.IP;

//Debug----------------------------------------------------

//Database-------------------------------------------------
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/MakerBlog", {
	useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride("_method"));

//PASSPORT-------------------------------------------------
app.use(require("express-session")({
	secret: "Idontknowifthisshouldbehere",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

//ROUTES---------------------------------------------------
const indexRoutes = require("./routes/index"),
	userRoutes = require("./routes/user"),
	projectRoutes = require("./routes/project"),
	postRoutes = require("./routes/post"),
	logRoutes = require("./routes/log");

app.use(indexRoutes);
app.use("/profile", userRoutes);
app.use("/project", projectRoutes);
app.use("/project/:id/posts", postRoutes);
app.use("/project/:id/posts/:postid/", logRoutes);

// Handle 404 error.
app.use("/404", function (req, res) {
	res.status(404).render("404");
});

// Handle 404 error.
app.use("*", function (req, res) {
	res.status(404).redirect("/404");
});

app.listen(PORT, IP, function () {
	console.log(`The Blog Server Has Started on port ${PORT}`);
});
