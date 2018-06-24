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

module.exports.addOne = (req, res)=> {
	User.create({
		username : req.body.username,
		password : req.body.password,
		role : req.body.role,
	});
}

