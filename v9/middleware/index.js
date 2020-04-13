// all middleware
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if(err){
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    //cannot do '==' or '===', since 'foundCampground.author.id' is a mongoose object, while 'req.user._id' is a string
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else{
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
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back"); // the previous page they were at
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports = middlewareObj