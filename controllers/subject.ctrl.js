var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');
var User = mongoose.model('User');

module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	Subject.find({} , function (err , doc) {
		if(err){
				console.log("Err in getAll of Subject.ctrlr");
		}
		else{
			console.log(doc);
			res.send(doc);
		}
	});
	
};

module.exports.addOne = (req, res)=> {
	Subject.create({
		name : req.body.name,
		subjectCode : req.body.subjectCode,
	});
	User.update(
		{username : req.body.username}, //searches for the required co in which we wish to add tool
		{$push : {subjects : Subject.find( {name : req.body.name} )
		 } },
		 function(err, doc) {
		 	if(err){
		 		console.log("Error in User.update of addOne in Subject.ctrlr");
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
