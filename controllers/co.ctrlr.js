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

// module.exports.addOne = function (req , res) {
// 	var myCO = {};
// 	myCO['coNum'] = req.body.cno;
// 	myCO['coName'] = req.body.cname;
// 	myCO['blooms'] = req.body.blooms;
// 	myCO['tools'] = [];
// 	var newCO = new CO(myCO);
// 	console.log(req.body);
// 	newCO.save(function(err , doc) {
// 		if(err){
// 			console.log('error' + err);
// 		}
// 		else{
// 			console.log('saved ' + doc);
// 			res.send("Got it")
// 		}
// 	});

// }

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


	// SubjectData.update(
	// 	{year : req.body.year}, //searches for the required co in which we wish to add tool
	// 	{$push : {co : CO.find( {name : req.body.name} )
	// 	 } },
	// 	 function(err, doc) {
	// 	 	if(err){
	// 	 		console.log("Error in SubjectData.update of addOne in co.ctrlr");
	// 	 	}
	// 	 	else
	// 	 	{
	// 	 		console.log("updated++++++++++++++++ ",doc);
	// 	 	}
	// 	 }
	// );



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

// module.exports.sendBoth = function (req , res) {
// 	CO.find({} , function(err , cos) {
// 		console.log(cos + "======");
// 	Tool.find({} , function(err , doc) {
// 		console.log(doc + "======");
// 		res.render('toolselector.ejs',{tools:doc,
// 				cos:cos});
// 	});
// 	});


// }

// module.exports.insertTool = function (req , res) {
// 	CO
// 		.findOneAndUpdate({coName: req.body.cos} ,
// 			{$push : {tools : req.body.tool}} ,
// 			function(err , doc) {
// 				console.log("updated =====",  doc);
// 			}
// 			);
// 	res.send(req.body);
// }
