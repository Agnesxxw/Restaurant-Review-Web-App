var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username:String,
        password:String
    });

UserSchema.plugin(passportLocalMongoose);// add bunch of methods come along with passport-local-mongoose package

module.exports = mongoose.model("User", UserSchema);
