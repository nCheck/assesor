
var TOOL = require('../data/toolModel').Tool;


module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	TOOL.find({}, function(err , db) {
		res.json(db);
	});
	
};

module.exports.addOne = function (req , res) {
	var myTOOL = {};
	console.log('inside adding');
	myTOOL['toolName'] = req.body.tName;
	myTOOL['toolNum'] = req.body.tNum;
	myTOOL['targetStudent'] = req.body.tarStu;
	myTOOL['targetMark'] = req.body.tarMark;
	myTOOL['totalStud'] = req.body.totStu;
	myTOOL['attainment'] = req.body.attain;
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


