var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");

mongoose.connect("mongodb://localhost/auth-demo-app");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"agnes",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // encode it, put it back to the session
passport.deserializeUser(User.deserializeUser()); // reading the session, decode it
// =================================
// Routs
// =================================
app.get("/",function (req, res) {
    res.render("home")
});

app.get("/secret", isLoggedIn, function (req, res) { // when request to /secret, it will check if the user is logged in
    res.render("secret");
});
// =================================
// Auth Routs
// =================================

//show sign up form
app.get("/register", function (req,res) {
    res.render("register");
});
//handling user sign up
app.post("/register",function (req,res) {
    req.body.username;
    req.body.password; // parsing the username and password from the form
    User.register(new User({username:req.body.username}), req.body.password, function (err,user) {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {//log the user in and run serializeUser function(local here)
            res.redirect("/secret");
        })
    });
});

// =================================
// Login Routs
// =================================
//login form
app.get("/login",function (req,res) {
    res.render("login")
});
//login logic
app.post("/login",passport.authenticate("local",{ //inside the app.post, run before teh final route callback
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function (req,res) {
});
// logout
app.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/");
})

//logout logic

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login"); // if not logged in, redirect to /login
}
app.listen(3000, function () {
    console.log("Server Started");
});