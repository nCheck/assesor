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
		res.render('index.ejs')
	})

	// else
	// 	res.render('dashboard')

	// User.find({role:"Admin"},function(err,user){

	// 	console.log("gleo"+req.user.role)
	// 	if(err)
	// 		console.log("Error spotted",err);
	// 	else
	// 	{
	// 		user.forEach(function(usr){
	// 		if(username === usr.username)
	//    	 		 res.render('admin.ejs',{user:teacher});

	// 		})

	// 	}
	// 		res.render('dashboard.ejs')
	// 	});
		}
module.exports.addOne = (req, res)=> {
	User.create({
		username : req.body.username,
		password : req.body.password,
		role : req.body.role,
	});
}
