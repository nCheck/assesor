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
//******************** code to remove User *********************
// User.find().remove().exec(function(err, data) {
//  	console.log("removed ",data);
// });

//****************** code to remove Subject************************
// Subject.find().remove().exec(function(err, data) {
//  	console.log("removed ",data);
// });

//********************** Creates a Subject*******************
// Subject.create({
// 	name : "OS",
// 	subjectCode : "0000",

// });
//***************** Lets push a Subject in our User's Subject array*****************
	// User.update(
// 	{username : "Bob"},
// 	{$push : {subjects : Subject.find({name : "CG"})
// 	}},
// 	function(err , doc) {
//  				console.log("updated =====",  doc);
// 			}
// );


//******************************I dont remember what dis is************************************************************
// 	{coName: req.body.cos} ,
// // 			{$push : {tools : req.body.tool}} , 
// // 			function(err , doc) {
// // 				console.log("updated =====",  doc);
// // 			}
// // 			);


//*********************** Created a User**********************
// User.create({
// 	username : "Bob",
// 	password : "mmm",
// 	isAdmin : false,
// 	subjects : [],
// }
// );


//********************* Displays all the users**********************
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

//*********************** Displays all the Subjects*****************
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
