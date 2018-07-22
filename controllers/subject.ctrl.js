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
			res.render('subjectList.ejs',{subjects:doc,req:req});
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
						console.log("here i am as an errror in subject data creation while assigning "+err);
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
module.exports.addSubjectByYear=(req,res)=>{

if(req.user.role=="Admin"){
console.log("Admin access of subject  ");
	Subject.findOne({name : req.params.subject}, (err , docc)=>{
		if(err)
		console.log("Cannot find it "+err);
		else{
			console.log(docc);
SubjectData.findOne({name:req.params.subject,year:req.query.year},(err,subData)=>{

	if(err){
		console.log("here i am as an errror in subject data creation while assigning "+err);
	}
	else if (subData == null) {
		console.log("Im inside null");
		SubjectData.create({year:req.params.year , name:req.params.subject},(err, sub)=>{
				console.log(sub);
				docc.subjectData.push(sub._id);
				docc.save();
			})
	}
	res.render('dashboard', {subject : req.params.subject,year:req.params.year , req : req });

})
}
})
}
else {
res.render('dashboard', {subject : req.params.subject,year:req.params.year , req : req });
}
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
		console.log(sub.name+" iS BORN  "+ sub);
	sub.save();
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
