var mongoose = require('mongoose');
var Subject=require("./subject");

console.log("i m here");


var userSchema = new mongoose.Schema({
	username : String,
	password : String ,
	isAdmin: Boolean,
	subjects:[Subject.subjectSchema],
});

mongoose.model("User",userSchema);



