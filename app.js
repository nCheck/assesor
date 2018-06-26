var express		= require('express');
var parser	=require('body-parser');
const dir 		= __dirname;
var User 		=require('./data/user');
var routes		=require('./routes/index');
var passport=require('passport')
var localstrategy=require('passport-local')
var passportlocalmongoose=require('passport-local-mongoose')
var app			=express();
require('./data/db.js');

app.set('view engine', 'ejs');
app.use(express.static(dir + '/public'));
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());
app.use(require('express-session')({
	secret:'short' ,
	resave:false,
	saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(User.authenticate()));	//User.authenticate present in passportlocal mongoose so no need to define in users.js
passport.serializeUser(User.serializeUser())		//No need to define function User.serializeUser since we used
passport.deserializeUser(User.deserializeUser())	//passport local mongoose it already has those function

app.use('/',routes);

require('./data/db.js');
var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');
var xlsx=require('./data/xlsx');


//===============Register page================

app
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
		passport.authenticate('local')(req,res,function(){
			res.redirect('/login')
		});
	})
});
//=================Login Page===============================

app
.route('/login')
.get(function(req,res){
	res.render('login.ejs')
})
.post(passport.authenticate("local",
	{successRedirect:'/dashboard',failureRedirect:'/login'}
));//middleware for checking database

app
.route('/dashboard')
.get(function(req,res){
	res.render('dashboard.ejs')
});

app.get('/admin' , (req , res)=>{
	if(req.user.username == 'ncheck'){
		res.render('admin');
	}
	else{
		res.send("unauthorized");
	}
});




//Creating a manual user dataa
// User.create({username:"Jason",password:"jason"},function(err,user){
// 	if(err)
// 		console.log("eRROR FOUND :",err)
// 	else
// 		console.log("User addded succesfully",user)
// })





// ========upload page temp==========
app.get('/upload' , (req ,res)=>{
	res.render('upload');
});
app.post('/upload', uploadCtrl.uploadFile);


app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
