var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
        {name:"Salmon Creek", image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Granite Hill", image:"https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Sunny View", image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Mountain High", image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Green Woods", image:"https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Yellow Stone", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Salmon Creek", image:"https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
        {name:"Granite Hill", image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
        {name:"Sunny View", image:"https://images.unsplash.com/photo-1524494860062-9442631ee30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"},
        {name:"Mountain High", image:"https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
        {name:"Green Woods", image:"https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Yellow Stone", image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
        ];
        
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampGrouds = {name:name, image:image};
    campgrounds.push(newCampGrouds);
    res.redirect("/campgrounds");// redirect to the campgrounds as a get request
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});



app.get("*", function(req,res){
    res.send("Sorry, you go to the wrong page");
});

app.listen(8080,process.env.ip, function () {
console.log("YelpCamp has started!");
});
