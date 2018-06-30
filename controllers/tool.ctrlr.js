var mongoose = require('mongoose');
var Tool = mongoose.model('Tool');
var ToolData = mongoose.model('ToolData');
var CO = mongoose.model('CO');

module.exports.getAll = function (req , res) {
	console.log('Sending Tool Data');
	CO.findById(req.params.coID).populate('tools').lean().exec ( (err , doc)=>{
		console.log(doc);
		res.render('toolsAdd', {subject : req.params.subject
			, coID : req.params.coID , tools : doc.tools });
	})

};


// ================send toolsname ================

module.exports.sendTool = (req , res)=>{
	Tool.find({}, (err,doc)=>{
		res.render('toolsAdd', {subject : req.params.subject
			, coID : req.params.coID , tools : doc , toolData : {} });
	});
}

module.exports.getToolDoc = (req , res)=>{
	Tool.find({}, (err,doc)=>{
		res.render('toolUpload', {subject : req.params.subject
			, coID : req.params.coID , tools : doc });
	});
}

//For this to work the req.body shud contain name of the co in which we wish to add the tool
module.exports.addOne = function (req , res) {
	ToolData.create({
		tool : req.body.tool,
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
