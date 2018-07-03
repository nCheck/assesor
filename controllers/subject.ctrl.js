var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');
var User = mongoose.model('User');
var SubjectData = mongoose.model('SubjectData');
var year = 2018;

module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	Subject.find({} , function (err , doc) {
		if(err){
				console.log("Err in getAll of Subject.ctrlr");
		}
		else{
			res.send(doc);
		}
	});

};

module.exports.assignCourse = (req, res)=> {
	console.log(req.body.teacherName);
	console.log(req.body.courseName);
	User.findOne({username:req.body.teacherName} , (err , doc)=>{
		if(err){
			console.log("doc not found " + err);
			res.send("error")
		}
		else {
			Subject.findOne({name : req.body.courseName}, (err , docc)=>{
				if(err)
				console.log("Cannot find it "+err);
				else{
					console.log(docc);
				doc.subjects.push(docc);
				doc.save();
			};

				SubjectData.findOne({year:year , name:req.body.courseName} , (err , doc)=>{
					if(err){
						console.log(err);
					}
					else if (doc == null) {
						console.log("Im inside null");
						SubjectData.create({year:year , name:req.body.courseName},(err, sub)=>{
								console.log(sub);
								docc.subjectData.push(sub._id);
								docc.save();
							})


					}
				});



				res.redirect('/admin')
			})
		}
	})
}

/////Sends all COS of Subject to API

module.exports.getCOs = (req , res) =>{
	subject = req.params.subject;
	year = req.params.year;

	SubjectData.findOne({name:subject , year : year} ).populate('co').exec( (err , doc)=>{
		cos = doc.co.map(function (co) {
			return co;
		})
		res.send(cos)
	})
}









module.exports.addSubject = (req, res)=> {
	Subject.create({
		name : req.body.subjectName,
		subjectCode : req.body.subjectCode,
	},(err,sub)=>{
		console.log(sub.name+" iS BORN  "+ sub)
	});
	res.redirect('/admin')
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
