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
            res.render("index",{campgrounds:allCampgrounds});
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
    res.render("new");
});


//SHOW: show the info of one yelpcamp()
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //console.log(req.params.id);
            console.log(err)
        }else{
            console.log(req.params.id);
            res.render("show",{campground:foundCampground});
        }
    });
    
});

app.listen(8080,process.env.ip, function () {
console.log("YelpCamp has started!");
});
