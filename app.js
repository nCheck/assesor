var express		= require('express');
var parser	=require('body-parser');
var mongoose=require('mongoose');
const dir 		= __dirname;
var User 		=require('./data/user');
var authroutes		=require('./routes/index');
var adminroutes=require('./routes/admin');
var dashRoutes=require('./routes/dashboard');
var passport=require('passport')
var localstrategy=require('passport-local')
var passportlocalmongoose=require('passport-local-mongoose')
var app			=express();


// =======initialize data base =======
require('./data/db.js');
var Subject = mongoose.model('Subject');
app.set('view engine', 'ejs');
app.use(express.static(dir + '/public'));
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// === Passport Setup ===

app.use(require('express-session')({
	secret:'short' ,
	resave:false,
	saveUninitialized:false
}))
//This makes all users available globally to be used in any ejs file
app.use((req,res,next)=>{
	User.find({},(err,user)=>{
		res.locals.user=user;
		next();
	})
})
//This for all subjects
app.use((req,res,next)=>{
	Subject.find({} , function (err , sub) {
		if(err){
				console.log("Err in getAll of Subject.ctrlr");
		}
		else{
			res.locals.subject=sub;
			next();
		}
	});
})
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(User.authenticate()));	//User.authenticate present in passportlocal mongoose so no need to define in users.js
passport.serializeUser(User.serializeUser())		//No need to define function User.serializeUser since we used
passport.deserializeUser(User.deserializeUser())	//passport local mongoose it already has those function


// =======Routes=======

app.use('/',authroutes);
app.use('/dashboard',dashRoutes);

app.use('/admin',adminroutes);


// =====Required Controllers======

var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');
var xlsx = require('./controllers/xlsx.ctrlr');





// ========upload page temp==========


app.get('/upload' , (req ,res)=>{
	res.render('upload');
});

app.post('/upload', uploadCtrl.uploadFile , xlsx.xlsxCal , uploadCtrl.deleteFile);

function isLoggedIn(req, res, next){
	console.log(req);
	console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
