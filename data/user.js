var mongoose = require('mongoose');
var Subject=mongoose.model("Subject");



var userSchema = new mongoose.Schema({
	username : String,
	password : String ,
	isAdmin: Boolean,
	subjects:[Subject.subjectSchema],
});

mongoose.model('User' , userSchema);