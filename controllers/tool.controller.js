
var TOOL = require('../data/toolModel');


module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	TOOL.find({}, function(err , db) {
		res.json(db);
	});
	
};

module.exports.addOne = function (req , res) {
	var myTOOL = {};
	myTOOL['toolName'] = req.body.tName;
	myCO['toolNum'] = req.body.tNum;
	myCO['targetStudent'] = req.body.tarStu;
	myCO['targetMark'] = req.body.tarMark;
	myCO['totalStud'] = req.body.totStu;
	myCO['attainment'] = req.body.attain;
	var newTOOL = new TOOL(myTOOL);
	console.log(req.body);
	newTOOL.save(function(err , doc) {
		if(err){
			console.log('error' + err);
		}
		else{
			console.log('saved ' + doc);
			res.send("Got it")
		}
	});

}


