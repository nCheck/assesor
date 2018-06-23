var exp=require('express')
var app=exp()
var parser=require('body-parser')
require('./data/db.js');

var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');
app.use(parser.urlencoded({extended:true}))


app.get('/upload' , (req ,res)=>{
	res.render('upload.ejs');
});
app.post('/upload', uploadCtrl.uploadFile);


app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
