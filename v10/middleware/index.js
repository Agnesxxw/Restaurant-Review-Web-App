// all middleware
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if(err){
                req.flash("error", "Campground is not found")
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    //cannot do '==' or '===', since 'foundCampground.author.id' is a mongoose object, while 'req.user._id' is a string
                    next();
                } else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back"); // the previous page they were at
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    //cannot do '==' or '===', since 'foundCampground.author.id' is a mongoose object, while 'req.user._id' is a string
                    next();
                } else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back"); // the previous page they were at
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first"); // error is the key here, req.flash("error") will call the value message here "Please login first"
    // it will only flash when req to next page, but is should declare BEFORE the redirect
    res.redirect("/login");

}

module.exports = middlewareObj