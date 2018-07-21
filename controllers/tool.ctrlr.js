var mongoose = require('mongoose');
var Tool = mongoose.model('Tool');
var ToolData = mongoose.model('ToolData');
var CO = mongoose.model('CO');

// module.exports.getAll = function (req , res) {
// 	console.log('Sending Tool Data');
// 	CO.findById(req.params.coID).populate('tools').lean().exec ( (err , doc)=>{
// 		res.render('toolsAdd', {subject : req.params.subject
// 			, coID : req.params.coID , tools : doc.tools , req : req });
// 	})

// };
var allTools = [];
module.exports.getData = function (req, res) {
	var toolA = [];

	Tool.find({}, (err, doc, next)=>{
		if(err){
			console.log("Err in Tool.find of getData n toolCtrlr is, ",err);
		}
		else{
			// console.log("the array of all tool names is: ",doc);
			doc.forEach((t)=>{
				allTools.push(t);
			});
			// console.log("allTools looks like this, ",allTools);
		}
	});


	CO.findById(req.params.coID).populate({
		path : 'tools' , populate : {
			path : 'tool',
			model : 'Tool'
		}
	}).lean().exec( (err, co )=>{
		if(err){
			console.log("in getData of tool.ctrl err is, ",err);
		}
		else {
			co.tools.forEach(function(t){
				toolA.push(t.tool.name);
			});
			// console.log("got tool names ",toolA);
			// console.log("CO Tools ",co.tools);
			// console.log("allTools looks like this once more, ",allTools);
			res.render("toolAdd",{thisToolNames : toolA , tools : co.tools , allTools : allTools, coID:req.params.coID});
		}
	});
}

//removes a single tool
module.exports.removeOne = (req , res)=>{
	res.send("reached the destroy route!");
}

// ================send toolsname ================
//shouldnt this be found first by subject then all tools selected by that id
// module.exports.sendTool = (req , res)=>{
// 	Tool.find({}, (err,doc)=>{
// 		res.render('toolAdd', {subject : req.params.subject
// 			, coID : req.params.coID , tools : doc , toolData : {} , req : req});
// 	});
// }

module.exports.getToolDoc = (req , res)=>{
	Tool.find({}, (err,doc)=>{
		res.render('toolUpload', {subject : req.params.subject
			, coID : req.params.coID , tools : doc  , req : req});
	});
}

//For this to work the req.body shud contain name of the co in which we wish to add the tool
module.exports.addOne = function (req , res) {
	if(req.body.name != ''){
		Tool.create({
			name : req.body.name
		}, (err, tool)=>{
				ToolData.create({
				tool : tool,
				weightage : req.body.weightage,
				targetStudent : req.body.targetStudent,
				totalMark : req.body.totalMark,
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
		})
	}
	else{
		ToolData.create({
		tool : req.body.tool,
		weightage : req.body.weightage,
		targetStudent : req.body.targetStudent,
		totalMark : req.body.totalMark,
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
