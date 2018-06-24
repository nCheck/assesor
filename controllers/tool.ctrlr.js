var mongoose = require('mongoose');
var Tool = mongoose.model('Tool');
var CO = mongoose.model('CO');

module.exports.getAll = function () {
	console.log('Sending Data');
	Tool.find({} , function (err , doc) {
		if(err){
			console.log("OhNo error in finding tools ");
		}
		else{
				console.log(doc);
				return doc;
		}
	});
	
};

// module.exports.addOne = function (req , res) {
// 	var myTOOL = {};
// 	console.log('inside adding');
// 	myTOOL['toolName'] = req.body.tName;
// 	myTOOL['toolNum'] = req.body.tNum;
// 	myTOOL['targetStudent'] = req.body.tarStu;
// 	myTOOL['targetMark'] = req.body.tarMark;
// 	myTOOL['totalStud'] = req.body.totStu;
// 	myTOOL['attainment'] = req.body.attain;
// 	var newTOOL = new TOOL(myTOOL);
// 	console.log(req.body);
// 	newTOOL.save(function(err , doc) {
// 		if(err){
// 			console.log('error' + err);
// 		}
// 		else{
// 			console.log('saved ' + doc);
// 			res.send("Got it")
// 		}
// 	});

// }


//For this to work the req.body shud contain name of the co in which we wish to add the tool
module.exports.addOne = function (req , res) {
	Tool.create({
		name : req.body.tName,
		weightage : req.body.weightage,
		targetStudent : req.body.targetStudent,
		targetMark : req.body.targetMark,
		totalStud : req.body.totalStud,
		directAttain : req.body.directAttain,
		indirectAttain : req.body.indirectAttain,
		high : req.body.high,
		mid : req.body.mid,
		low : req.body.low,
		point : req.body.point

	});
	CO.update(
		{name : req.body.cName}, //searches for the required co in which we wish to add tool
		{$push : {tools : Tool.find( {name : req.body.tName} )
		 } },
		 function(err, doc) {
		 	if(err){
		 		console.log("Error in co.update of addOne in tool.ctrlr");
		 	}
		 	else
		 	{
		 		console.log("updated++++++++++++++++ ",doc);
		 	}
		 }
	);
}

//*****************To remove a tool*********************
module.exports.removeOne = function (req, res) {
	CO.update(
		{name : req.body.cName},
		{$pull : {tools : Tool.find( {name : req.body.tName}) 
		}},
		function(err, doc) {
			if(err){
				console.log("Err in co.update of RemoveOne in tool.ctrlr");
			}
			else{
				console.log("updated--------------",doc);
			}
		}
	)
}
