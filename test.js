var exp=require('express')
var app=exp()
var parser=require('body-parser')
require('./testdb.js');

var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
app.use(parser.urlencoded({extended:true}))



app.listen(2535 , function () {
	console.log('Site is active ');
});
