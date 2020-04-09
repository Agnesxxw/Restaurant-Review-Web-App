var mongoose = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment = require("./models/comment");
var data = [
    {
        name:"Cloud's Rest", 
        image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=959&q=80",
        description: "This is heaven"
    },
    {
        name:"Candy Valley", 
        image:"https://images.unsplash.com/photo-1528892677828-8862216f3665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Candy is sweet"
    },
    {
        name:"Great Valley", 
        image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "I like here"
    }
    ];
    
function seedDB(){
    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campground");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Create a campground");
                    Comment.create(
                        {
                        text:"This place is greate, but I wish there was internet",
                        author:"Mark"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Create a comments");
                        }
                    });
                }
            });
        });
    });
}


module.exports = seedDB;