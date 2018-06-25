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
module.exports.displayAll=(req,res)=>{
	var username =req.body.username,
		password =req.body.password;
	User.find({},function(err,user){
		
		if(err)
			console.log("Error spotted",err);
		else if(username === user[0].username && password === user[0].password)
			res.render('admin.ejs',{user:user})
			res.render('display.ejs',{user:user})
			
	});
}
module.exports.addOne = (req, res)=> {
	User.create({
		username : req.body.username,
		password : req.body.password,
		role : req.body.role,
	});
}

