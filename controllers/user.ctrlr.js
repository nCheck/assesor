var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');
var User = mongoose.model('User');

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
	var username =req.body.username,
		password =req.body.password;
	let teacher;


	User.find({},function(err,us){
		teacher=us;

		if(req.user.role==='Admin')
		res.render('admin.ejs',{user:us})			//All teachers
		else
		res.redirect('/');
	})
		}


module.exports.addOne = (req, res)=> {
	User.create({
		username : req.body.username,
		password : req.body.password,
		role : req.body.role,
	});
}
