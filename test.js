var exp=require('express')
var mongoose = require('mongoose')
var app=exp()
var parser=require('body-parser')
require('./testdb.js');

// var coCtrl = require('./controllers/co.ctrlr');
// var toCtrl = require('./controllers/tool.ctrlr');
app.use(parser.urlencoded({extended:true}))



app.listen(2535 , function () {
	console.log('Site is active ');
});



var User = mongoose.model('User');


var UserA = new User();
UserA.username = "Bob";
UserA.password = "mmm";
UserA.isAdmin = false;
UserA.subjects = [];

UserA.save(function(err, user){
	if(err){
		console.log("Smthg is not right");
	}
	else{
		console.log("fine.....",user);
	}
});
