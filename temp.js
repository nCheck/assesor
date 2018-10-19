var exp=require('express')
var mongoose = require('mongoose')
var app=exp()
var parser=require('body-parser')
require('./data/db.js');

// var coCtrl = require('./controllers/co.ctrlr');
// var toCtrl = require('./controllers/tool.ctrlr');
app.use(parser.urlencoded({extended:true}))



app.listen(2535 , function () {
	console.log('Site is active ');
});



var User = mongoose.model('User');
var Tool = mongoose.model('Tool');
var ToolData = mongoose.model('ToolData');
var Subject = mongoose.model('Subject');
var SubjectData = mongoose.model('SubjectData');
var CO = mongoose.model('CO');

// *****************Creates CO ******************


// CO.create({
// 	name : 'Sample Number 2',
// 	blooms : 'Doin',
// 	number : 3,
// 	attainment : 0
// }).then((doc,err)=>{
// 	console.log(doc)
// });

// CO.remove({_id : '5bc5637ff70624205c65ab87'} , (err , doc)=>{
// 	console.log("firs" , typeof doc)
// })

CO.findById('5bc56a16933b6426c8e74fa5' , (err , doc)=>{
	doc.remove();
})

// CO.findById()