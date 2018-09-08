var mongoose = require('mongoose');
var Tool = mongoose.model('Tool');
var ToolData = mongoose.model('ToolData');
var CO = mongoose.model('CO');


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
			console.log("this is type "+typeof(toolA));
			res.render("toolAdd",{thisToolNames : toolA , tools : co.tools
				 , allTools : allTools , req : req ,
				subject : req.params.subject , year : req.params.year
			});
		}
	});
}



module.exports.getToolDoc = (req , res)=>{
	Tool.find({}, (err,doc)=>{
		res.render('toolUpload', {subject : req.params.subject , year : req.params.year
			, coID : req.params.coID , tools : doc  , req : req});
	});
}

//For this to work the req.body shud contain name of the co in which we wish to add the tool
module.exports.addOne = function (req , res) {
	var toolName=req.body.name;
	var f=0;
	var tool_id=0;
	Tool.findOne({ name: toolName}, function (err, doc){
if(err || doc == null){
	console.log(err || doc)
f=1;
}
else{
	tool_id=doc._id;
}

	if(f==1){
		Tool.create({
			name : req.body.name	
		}, (err, tool)=>{
			// console.log("toool creation " , tool)
				ToolData.create({
				tool : tool,
				weightage : req.body.weightage,
				targetStudent : req.body.targetStudent,
				totalMark : req.body.totalMark,
				targetMark : req.body.targetMark,
				high : req.body.high,
				mid : req.body.mid,
				low : req.body.low,
				toolType:req.body.toolType

				}, (err , doc)=>{
					// console.log("tooolData creation " , doc)
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
		tool : tool_id,
		weightage : req.body.weightage,
		targetStudent : req.body.targetStudent,
		totalMark : req.body.totalMark,
		targetMark : req.body.targetMark,
		high : req.body.high,
		mid : req.body.mid,
		low : req.body.low,
		toolType:req.body.toolType

	}, (err , doc)=>{
		var toolId = doc._id;
		// console.log("tooldata creation " , doc , "tool id" , tool_id)
		CO.findById(req.params.coID , (err,docc)=>{
			docc.tools.push(toolId);
			docc.save();
			backURL=req.header('Referer')||'/';
			res.redirect(backURL);
		})

	});

}

	})

	
}//end of tool.findone

//*****************To remove a tool*********************
module.exports.removeOne = function (req, res) {
	ToolData.deleteOne({_id:req.params.toolID} , (err)=>{
		if(err){
			res.send(err)
		}
		else{

			backURL=req.header('Referer');
			res.redirect(backURL)
		}
	});

}
//Get all tools
module.exports.getAllTools=function(req,res){
	var allTools=[];
	Tool.find({} , (err , doc)=>{
		if(err){
			console.log(err);
			res.send(err)
		}
		else{
			doc.forEach((tool)=>{
				allTools.push(tool.name);
			})
			res.send(allTools);
		}

	});
}