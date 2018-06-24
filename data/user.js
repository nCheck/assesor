var mongoose = require('mongoose');
var Subject=require("./subject");

console.log("i m here");


var userSchema = new mongoose.Schema({
	username : String,
	password : String ,
	role :{
		type : String,
		default : 'Teacher'
	},
	subjects:[Subject.subjectSchema],
});

module.exports=mongoose.model("User",userSchema);
