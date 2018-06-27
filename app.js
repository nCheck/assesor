var express		= require('express');
var parser	=require('body-parser');
const dir 		= __dirname;
var User 		=require('./data/user');
var authroutes		=require('./routes/index');
var coRoutes	= require('./routes/co');
var passport=require('passport')
var localstrategy=require('passport-local')
var passportlocalmongoose=require('passport-local-mongoose')
var app			=express();


// =======initialize data base =======
require('./data/db.js');

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
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(User.authenticate()));	//User.authenticate present in passportlocal mongoose so no need to define in users.js
passport.serializeUser(User.serializeUser())		//No need to define function User.serializeUser since we used
passport.deserializeUser(User.deserializeUser())	//passport local mongoose it already has those function


// =======Routes=======

app.use('/',authroutes);
app.use('/co' , coRoutes);



// =====Required Controllers======

var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');
var xlsx = require('./controllers/xlsx.ctrlr');





// ========upload page temp==========


app.get('/upload' , (req ,res)=>{
	res.render('upload');
});

app.post('/upload', uploadCtrl.uploadFile , xlsx.xlsxCal);


app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
