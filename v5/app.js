var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/users"),
    seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public")); //dirname is the current script working path
app.set("view engine", "ejs");



app.get("/", function (req, res) {
    res.render("landing");
});

//INDEX : show all the yelpcamp
app.get("/campgrounds", function(req,res){
    //get all the campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log("has error")
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
    // 
});
//CREATE: create a new yelpcamp
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});


//SHOW: show the info of one yelpcamp()
app.get("/campgrounds/:id", function(req,res){
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

// ======================
// Comments Routs
// ======================
app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

app.post("/campgrounds/:id", function (req,res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(3000,process.env.ip, function () {
console.log("YelpCamp has started!");
});
