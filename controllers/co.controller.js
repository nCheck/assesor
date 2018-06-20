
var CO = require('./data/coModel');


module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	co.find({}, function(err , db) {
		res.json(db);
	});
	
};

module.exports.addOne = function (argument) {
	var myCO = {};
	myCO['coNum'] = req.body.cno;
	myCO['coName'] = req.body.cname;
	myCO['blooms'] = req.body.blooms;
	myCO['tools'] = [];
	var newCO = new CO(myCO);
	newCO.save(function(err , doc) {
		if(err){
			console.log('error' + err);
		}
		else{
			console.log('saved ' + doc);
		}
	});

}