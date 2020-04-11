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
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampGrouds = {name:name, image:image, description:desc};
    //create a new campground and save to DB
    Campground.create(newCampGrouds, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds");// redirect to the campgrounds as a get request
        }
    })
});

// NEW: show the form to input the new yelpcamp (this must before /campgrounds/:id)
router.get("/new", function(req, res){
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

module.exports = router;