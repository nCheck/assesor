var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');
var User = mongoose.model('User');
var Tool=mongoose.model('Tool');
module.exports.getAll = function (req , res) {
	console.log('Sending Data');
	Subject.find({} , function (err , doc) {
		if(err){
				console.log("Err in getAll of User.ctrlr");
		}
		else{
			console.log(doc);
			res.send(doc);
		}
	});

};
//===To display all users =============
module.exports.viewingregion=(req,res)=>{

		if(req.user.role==='Admin')
			res.redirect('/admin');			//All teachers
		else{
			res.redirect('/dashboard');
		}
	}


module.exports.addOne = (req, res)=> {
	User.create({
		username : req.body.username,
		password : req.body.password,
		role : req.body.role,
	});
}
