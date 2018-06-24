var express=require('express');
var app=express();
var parser=require('body-parser');
var routes=require('./routes/index.js');
const dir = __dirname;

app.set('view engine', 'ejs');
app.use(express.static(dir + '/public'));
app.use(parser.urlencoded({extended:true}));
app.use('/',routes);

require('./data/db.js');
var User=require('./data/user.js');
var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');
//Creating a manual user dataa
// User.create({username:"Jason",password:"jason"},function(err,user){
// 	if(err)
// 		console.log("eRROR FOUND :",err)
// 	else
// 		console.log("User addded succesfully",user)
// })
app.get('/upload' , (req ,res)=>{
	res.render('upload');
});
app.post('/upload', uploadCtrl.uploadFile);


app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
