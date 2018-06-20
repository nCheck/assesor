//var mongoose = require('mongoose');
var CO = require('../data/COModel');
var Tool = require('../data/toolModel').Tool;

module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	CO.find({} , function (err , doc) {
		console.log(doc);
		res.send(doc);
	});
	
};

module.exports.addOne = function (req , res) {
	var myCO = {};
	myCO['coNum'] = req.body.cno;
	myCO['coName'] = req.body.cname;
	myCO['blooms'] = req.body.blooms;
	myCO['tools'] = [];
	var newCO = new CO(myCO);
	console.log(req.body);
	newCO.save(function(err , doc) {
		if(err){
			console.log('error' + err);
		}
		else{
			console.log('saved ' + doc);
			res.send("Got it")
		}
	});

}


module.exports.sendBoth = function (req , res) {
	CO.find({} , function(err , cos) {
		console.log(cos + "======");
	Tool.find({} , function(err , doc) {
		console.log(doc + "======");
		res.render('toolselector.ejs',{tools:doc,
				cos:cos});		
	});
	});


}

module.exports.insertTool = function (req , res) {
	CO
		.findOneAndUpdate({coName: req.body.cos} ,
			{$push : {tools : req.body.tool}} ,
			{upsert : true} , 
			function(err , doc) {
				console.log("updated =====",  doc);
			}
			);
	res.send(req.body);
}