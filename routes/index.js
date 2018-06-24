var exp=require('express'),
	router=exp.Router(),
	userctrlr=require('../controllers/user.ctrlr.js');
router
	.route('/login')
	.get((req,res)=>res.render('login.ejs'))
	.post(userctrlr.getAll)