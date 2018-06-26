var mongoose = require('mongoose');
var SubjectData = mongoose.model('SubjectData');
var Subject = mongoose.model('Subject');


module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	SubjectData.find({} , function (err , doc) {
		if(err){
				console.log("Err in getAll of SubjectData.ctrlr");
		}
		else{
			console.log(doc);
			res.send(doc);
		}
	});
	
};

module.exports.addOne = (req, res)=> {
	SubjectData.create({
		year : req.body.year,
	});
	Subject.update(
		{name : req.body.name}, //searches for the required co in which we wish to add tool
		{$push : {subjectData : SubjectData.find( {year : req.body.year} )
		 } },
		 function(err, doc) {
		 	if(err){
		 		console.log("Error in Subject.update of addOne in SubjectData.ctrlr");
		 	}
		 	else
		 	{
		 		console.log("updated++++++++++++++++ ",doc);
		 	}
		 }
	);

}



module.exports.removeOne = (req, res)=> {
	Subject.update(
		{name : req.body.name},
		{$pull : {subjectData : SubjectData.find( {year : req.body.year}) 
		}},
		function(err, doc) {
			if(err){
				console.log("Err in Subject.update of RemoveOne in subjectData.ctrlr");
			}
			else{
				console.log("updated--------------",doc);
			}
		}
	)
}
