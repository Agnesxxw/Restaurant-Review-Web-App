var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleWare = require("../middleware"); // it will automatically call index.js
//INDEX : show all the yelpcamp
router.get("/", function(req,res){
    //req.user
    //get all the restaurants from db
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("has error")
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});
//CREATE: create a new yelpcamp
router.post("/", middleWare.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampGrounds = {name:name,price:price, image:image, description:desc, author: author};
    //create a new campground and save to DB
    Campground.create(newCampGrounds, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated);
            res.redirect("/LetUsEatOut");// redirect to the campgrounds as a get request
        }
    })
});

// NEW: show the form to input the new yelpcamp (this must before /campgrounds/:id)
router.get("/new", middleWare.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});


//SHOW: show the info of one yelpcamp()
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //console.log(req.params.id);
            console.log(err)
        }else{
            //console.log(req.params.id);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });

});
// Edit campground route
router.get("/:id/edit", middleWare.checkCampgroundOwnership, function (req, res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});
// Edit
router.put("/:id",middleWare.checkCampgroundOwnership, function (req, res) {
    //find and update the right campground and redirect to somewhere
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/LetUsEatOut");
        }else{
            res.redirect("/LetUsEatOut/" + req.params.id);
        }
    })
});
// Destroy Campgrounds Routes
router.delete("/:id",middleWare.checkCampgroundOwnership, function (req, res){
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/LetUsEatOut");
        } else{
            res.redirect("/LetUsEatOut");
        }
    });
});


module.exports = router;