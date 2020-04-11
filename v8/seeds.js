var mongoose = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment = require("./models/comment");
var data = [
    {
        name:"Cloud's Rest", 
        image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=959&q=80",
        description: "Convallis a cras semper auctor neque. Magna fringilla urna porttitor rhoncus dolor purus. Suspendisse in est ante in nibh mauris. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. In fermentum et sollicitudin ac. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Purus sit amet volutpat consequat mauris nunc. Ipsum dolor sit amet consectetur. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Leo urna molestie at elementum. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Parturient montes nascetur ridiculus mus. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Convallis tellus id interdum velit. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit."
    },
    {
        name:"Candy Valley", 
        image:"https://images.unsplash.com/photo-1528892677828-8862216f3665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Convallis a cras semper auctor neque. Magna fringilla urna porttitor rhoncus dolor purus. Suspendisse in est ante in nibh mauris. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. In fermentum et sollicitudin ac. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Purus sit amet volutpat consequat mauris nunc. Ipsum dolor sit amet consectetur. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Leo urna molestie at elementum. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Parturient montes nascetur ridiculus mus. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Convallis tellus id interdum velit. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit."
    },
    {
        name:"Great Valley", 
        image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Convallis a cras semper auctor neque. Magna fringilla urna porttitor rhoncus dolor purus. Suspendisse in est ante in nibh mauris. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. In fermentum et sollicitudin ac. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Purus sit amet volutpat consequat mauris nunc. Ipsum dolor sit amet consectetur. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Leo urna molestie at elementum. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Parturient montes nascetur ridiculus mus. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Convallis tellus id interdum velit. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit."
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