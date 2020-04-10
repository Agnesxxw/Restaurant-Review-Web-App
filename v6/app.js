var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    User          = require("./models/users"),
    seedDB        = require("./seeds");


mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //dirname is the current script working path
seedDB();


// Passport Configuration
app.use(require("express-session")({
    secret:"Agnes",
    resave:true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) { // app.use let every route to call this function
    res.locals.currentUser = req.user;
    next(); // move to next middleware
});

// ============================
// Routing
// ==========================
app.get("/", function (req, res) {
    res.render("landing");
});

//INDEX : show all the yelpcamp
app.get("/campgrounds", function(req,res){
    req.user
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

app.post("/campgrounds/:id", isLoggedIn, function (req,res) {
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

// ===================
// Auth routes
// ===================
// register form
app.get("/register", function (req, res) {
    res.render("register");
});
// register logic
app.post("/register", function (req,res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

// login form
app.get("/login", function (req, res) {
    res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect: "/login"
}),function (req, res) { // this callback actually do nothing
});

// add logout route
app.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/campgrounds");
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

app.listen(3000,process.env.ip, function () {
    console.log("YelpCamp has started!");
});
