var mongoose = require('mongoose');
var CO = mongoose.model('CO');
var SubjectData = mongoose.model('SubjectData');
var Subject = mongoose.model('Subject');

module.exports.getDataDoc = function (req , res) {

	query = {name : req.params.subject , year : 2018};
	console.log('Sending DataDoc');
	var ret;
	SubjectData.findOne(query).populate('co').lean().exec((err , doc)=>{
		if(err){
			console.log("not found " + err);
		}
		else {
			console.log(doc);
			res.render('toolUpload' , {coData : doc.co , tools: [{name:"Test1"},{name:"Test2"}] });
		}
	})

};

module.exports.getData = function (req , res , next) {

	query = {name : req.params.subject , year : 2018};
	console.log('Sending Data');
	var ret;
	SubjectData.findOne(query).populate('co').lean().exec((err , doc)=>{
		if(err){
			console.log("not found " + err);
		}
		else {
			console.log(doc);
			res.render('coPage' , {data : doc.co});
		}
	})

};

// ==========paste=========
// if(d.tools.indexOf(req.params.toolID)!=-1){
// 	dc.push(d);
// }

// ============get co of tool id ========

module.exports.getCO = (req , res)=>{
	var dc = []
	SubjectData.findOne({name:req.params.subject , year : 2018}).populate({
		path : 'co' , populate : {
			path : 'tools',
			model : 'ToolData'
		}
	}).exec((err , doc)=>{

		doc.co.forEach(function (c) {
			c.tools.forEach(function (t) {
				if(t.tool == req.params.toolID){
					dc.push(c);

					console.log("pushed " + dc);
					return ;
				}
			})
		})
		console.log("this is dc " + dc);
		res.send(dc);
	})
}


//waste create then find better find sub inside it create n oush

module.exports.addOne = (req, res)=> {
	console.log("im inside add one"+req.params.subject);
	var query = {name : req.params.subject , year : 2018};
	CO.create({
		name : req.body.name,
		blooms : req.body.blooms,
		number : req.body.number
	}).then(
		SubjectData.findOne(query, (err,doc)=>{
			CO.findOne({
				name : req.body.name,
				blooms : req.body.blooms,
				number : req.body.number
			} , (err , docc)=>{
				doc.co.push(docc._id);
				doc.save();
				res.redirect('co');
			})
		})
	);

};





module.exports.removeOne = (req, res)=> {
	SubjectData.update(
		{year : req.body.year},
		{$pull : {co : CO.find( {name : req.body.name})
		}},
		function(err, doc) {
			if(err){
				console.log("Err in SubjectData.update of RemoveOne in co.ctrlr");
			}
			else{
				console.log("updated--------------",doc);
			}
		}
	)
}






// ======== Sends all the tools of A co to api

module.exports.getTools = (req , res)=>{
	var coID = req.params.coID;

	CO.findById(coID).populate({
		path : 'tools' , populate : {
			path : 'tool',
			model : 'Tool'
		}
	}).exec((err , doc)=>{
		var tools = doc.tools.map(function (t) {
			return t;
		})
		res.send(tools)
	})

}



module.exports.getCOGraph = function (req , res , next) {

	query = {name : req.params.subject , year : 2018};
	console.log('Sending Data');
	var ret;
	SubjectData.findOne(query).populate('co').lean().exec((err , doc)=>{
		if(err){
			console.log("not found " + err);
		}
		else {
			console.log(doc);
			res.render('graph' , {data : doc.co});
			var attain=data.map(function(t){
				return t.attainment;
				})
	
		}
		
	})

};

