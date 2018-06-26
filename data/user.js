var mongoose = require('mongoose');
var passportlocalmongoose=require('passport-local-mongoose')
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

userSchema.plugin(passportlocalmongoose);//Add all functionalities of local mongoose available to model created by this schema
module.exports=mongoose.model('User',userSchema);
