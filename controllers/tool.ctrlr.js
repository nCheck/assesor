var mongoose = require('mongoose');
var Tool = mongoose.model('Tool');
var CO = mongoose.model('CO');

module.exports.getAll = function (req , res) {
	console.log('Sending Tool Data');
	CO.findById(req.params.coID).populate('tools').lean().exec ( (err , doc)=>{
		console.log(doc);
		res.render('toolsAdd', {subject : req.params.subject
			, coID : req.params.coID , tools : doc.tools });
	})

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
		name : req.body.name,
		weightage : req.body.weightage,
		targetStudent : req.body.targetStudent,
		targetMark : req.body.targetMark,
		totalStud : req.body.totalStud,
		high : req.body.high,
		mid : req.body.mid,
		low : req.body.low,
		toolType:req.body.toolType

	}, (err , doc)=>{
		var toolId = doc._id;
		CO.findById(req.params.coID , (err,docc)=>{
			docc.tools.push(toolId);
			docc.save();
			backURL=req.header('Referer')||'/';
			res.redirect(backURL);
		})

	});

}

//*****************To remove a tool*********************
module.exports.removeOne = function (req, res) {
	Tool.deleteOne({_id:req.params.toolID});
	CO.findById(req.params.coID,(err , doc)=>{
		doc.tools.splice( doc.tools.indexOf(req.params.toolID), 1 );
		doc.save();
	})
		backURL=req.header('Referer');
		res.redirect(backURL)
}
