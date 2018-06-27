var exp=require('express'),
	router=exp.Router(),
	usercntrlr=require('../controllers/user.ctrlr.js');
var passport=require('passport')
var User=require('../data/user')
//===============Register page================

router
.route('/register')
.get(function(req,res){
	res.render('register.ejs') 
})
.post(function(req,res){
	var username =req.body.username,
	password = req.body.password;
	console.log(req.body);
	User.register(new User({username:username}),password,function(err,user){
		if (err)
			{   console.log(err)
				return res.render('register')
			}	
		passport.authenticate('local')(function(req,res){
			res.redirect('/login')
		});
	})
});
//=================Login Page===============================

router
.route('/login')
.get(function(req,res){
	res.render('login.ejs')
})
.post(passport.authenticate("local",),usercntrlr.viewingregion)//middleware for checking database 
function isLoggedIn(req, res, next){
	console.log(req);
	console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router