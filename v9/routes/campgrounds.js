var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX : show all the yelpcamp
router.get("/", function(req,res){
    req.user
    //get all the campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("has error")
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});
//CREATE: create a new yelpcamp
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampGrounds = {name:name, image:image, description:desc, author: author};
    //create a new campground and save to DB
    Campground.create(newCampGrounds, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");// redirect to the campgrounds as a get request
        }
    })
});

// NEW: show the form to input the new yelpcamp (this must before /campgrounds/:id)
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});


//SHOW: show the info of one yelpcamp()
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //console.log(req.params.id);
            console.log(err)
        }else{
            console.log(req.params.id);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });

});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports = router;