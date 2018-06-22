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
var Subject = mongoose.model('Subject');

// User.find().remove().exec(function(err, data) {
//  	console.log("removed ",data);
// });


// Subject.find().remove().exec(function(err, data) {
//  	console.log("removed ",data);
// });
Subject.create({
	name : "OS",
	subjectCode : "0000",

});

// User.update(
// 	{username : "Bob"},
// 	{$push : {subjects : Subject.find({name : "CG"})
// 	}},
// 	function(err , doc) {
//  				console.log("updated =====",  doc);
// 			}
// );


//*******************************************************************************************
// 	{coName: req.body.cos} ,
// // 			{$push : {tools : req.body.tool}} , 
// // 			function(err , doc) {
// // 				console.log("updated =====",  doc);
// // 			}
// // 			);



// User.create({
// 	username : "Bob",
// 	password : "mmm",
// 	isAdmin : false,
// 	subjects : [],
// }
// );



User.find({}, function(err, cats){
	if(err)
	{
		console.log("oh no err   ",err);

	}
	else
	{
		console.log("all the users&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		console.log(cats);
	}
});

Subject.find({}, function(err, cats){
	if(err)
	{
		console.log("oh no err   ",err);

	}
	else
	{
		console.log("all the subjects################ ");
		console.log(cats);
	}
});