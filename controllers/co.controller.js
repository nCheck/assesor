//var mongoose = require('mongoose');
var CO = require('../data/COModel');
var toolArr = require('./tool.controller.js').toolArr;

module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	CO.find({}, function(err , db) {
		res.json(db);
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

module.exports.insertTool = function (req , res) {
	CO
		.update(
   			{"coName":req.coName} ,
   			{ $push: { tools: req.toolname } }
			)
}