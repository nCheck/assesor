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
var SubjectData = mongoose.model('SubjectData');
var CO = mongoose.model('CO');
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
// 	name : 'OS',
// 	subjectCode : "FUCKU",
// 	subjectData : []
//
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
// User.find({}, function(err, cats){
// 	if(err)
// 	{
// 		console.log("oh no err   ",err);
//
// 	}
// 	else
// 	{
// 		console.log("all the users&&&&&&&&&&&&&&&&&&&&&&&&&&&");
// 		console.log(cats);
// 	}
// });
// *****************Creates CO ******************
// CO.create({
// 	name : 'Hello',
// 	blooms : 'Die',
// 	number : 8,
// 	attainment : 1
// });
// ========pushing subjectData to Subject =======
// Subject.findOne({name:'OS'} , (err , doc) =>{
// 	var query = {name : 'OS' , year : '2018'};
// 	SubjectData.findOne(query , (err , docc)=>{
// 		console.log("doc found is" + docc);
// 		// doc.subjectData.push(docc);
// 		// doc.save();
// 		// console.log("end of log " + doc.co);
// 		// console.log("Shit ")
// 		// CO.findOne({name:'Hello'} , (err , docc)=>{
// 		// 	console.log(docc);
// 		// 	doc.co.push(docc)
// 		// 	doc.save();
// 		// });
// 		// doc.co.push()
// 		// subData['2018'].push(CO.findOne( {name : req.body.name} ) );
// 	})
// })
// ===========pushing CO to Subject ==========
// var query = {name : 'OS' , year : '2018'};
// SubjectData.findOne(query , (err , doc)=>{
// 	// console.log("doc found is" + doc);
// 	// console.log("end of log " + doc.co);
// 	// console.log("Shit ")
// 	CO.findOne({name:'Hello'} , (err , docc)=>{
// 		console.log(docc+"===my CO");
// 		doc.co.push(docc)
// 		doc.save();
// 	});
// 	// doc.co.push()
// 	// subData['2018'].push(CO.findOne( {name : req.body.name} ) );
// })
// ==========creating subjectdata ==========
// SubjectData.create({
// 	name : 'OS' ,
// 	year : 2018 ,
// });
//*********************** Displays all the Subjects*****************
SubjectData.find({name : 'OS'}, function(err, cats){
	if(err)
	{
		console.log("oh no err   ",err);

	}
	else
	{
		// Subject.findOne({name : 'OS'} , (err , doc)=>{
		// 	doc.subjectData.push(cats);
		// 	doc.save();
		// })
		console.log(cats[0].co);
	}
});
