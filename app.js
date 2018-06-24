var express=require('express');
var app=express();
var parser=require('body-parser');
const dir = __dirname;

app.set('view engine', 'ejs');
app.use(express.static(dir + '/public'));
app.use(parser.urlencoded({extended:true}));


require('./data/db.js');
var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');

app.get('/upload' , (req ,res)=>{
	res.render('upload');
});
app.post('/upload', uploadCtrl.uploadFile);


app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
