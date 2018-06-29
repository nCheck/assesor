var mongoose = require('mongoose');
var passportlocalmongoose=require('passport-local-mongoose')
var Subject=require("./subject");
var Schema = mongoose.Schema;
console.log("i m here");


var userSchema = new mongoose.Schema({
	username : String,
	password : String ,
	role :{
		type : String,
		default : 'Teacher'
	},
	subjects:[{type : Schema.Types.ObjectId, ref: 'Subject'}],
});

userSchema.plugin(passportlocalmongoose);//Add all functionalities of local mongoose available to model created by this schema
module.exports=mongoose.model('User',userSchema);
