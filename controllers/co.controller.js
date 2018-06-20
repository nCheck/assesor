
var CO = require('./data/coModel');


module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	co.find({}, function(err , db) {
		res.json(db);
	});
	
};

module.exports.addOne = function (argument) {
	var myCO = {};
	myCO['no'] = req.body.no;
	myCO['name'] = req.body.name;
	myCO['bloomsLevel'] = req.body.blooms;
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