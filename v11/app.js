 var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User          = require("./models/users"),
     flash        = require("connect-flash");
    //seedDB        = require("./seeds");

var commentRoutes    = require("./routes/comments"),
    letUsEatOutRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost/LetUsEatOut", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //dirname is the current script working path
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database


// Passport Configuration
app.use(require("express-session")({
    secret:"Agnes",
    resave:true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) { // app.use let every route to call this function
    res.locals.currentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success = req.flash("success");
    next(); // move to next middleware
});

// requiring routes
app.use(authRoutes);
app.use("/LetUsEatOut",letUsEatOutRoutes);
app.use("/LetUsEatOut/:id/comments",commentRoutes);

app.listen(3000,process.env.ip, function () {
    console.log("LetUsEatOut has started!");
});
