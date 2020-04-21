var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users");


// ============================
// Root Routing
// ==========================
router.get("/", function (req, res) {
    res.render("landing");
});

// ===================
// Auth routes
// ===================
// register form
router.get("/register", function (req, res) {
    res.render("register");
});
// register logic
router.post("/register", function (req,res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            req.flash("error", err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success","Welcome to LetUsEatOut " + user.username);
            res.redirect("/LetUsEatOut");
        });
    });
});

// login form
router.get("/login", function (req, res) {
    res.render("login");
});

// login logic
router.post("/login", passport.authenticate("local", {
    successRedirect:"/LetUsEatOut",
    failureRedirect: "/login"
}),function (req, res) { // this callback actually do nothing
});

// logout route
router.get("/logout",function (req,res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/LetUsEatOut");
});

module.exports = router;