var mongoose = require('mongoose');
var Subject=mongoose.model("Subject");



var userSchema = new mongoose.Schema({
	username : String,
	password : String ,
	isAdmin: Number,
	subjects:[Subject],
});

mongoose.model('User' , userSchema);