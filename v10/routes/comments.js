var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router({mergeParams:true});
var middleWare = require("../middleware"); // it will automatically call index.js

// comments new
router.get("/new", middleWare.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

//comments create
router.post("/", middleWare.isLoggedIn, function (req,res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save
                    comment.save()
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleWare.checkCommentsOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });

});
// comment update
router.put("/:comment_id", middleWare.checkCommentsOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// comment destroy routes
router.delete("/:comment_id", middleWare.checkCommentsOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success","Comment deleted")
            res.redirect("/campgrounds/" + req.params.id); // this id is the campground id
        }
    });
});

module.exports = router;
