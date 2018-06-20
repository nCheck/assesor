var exp=require('express')
var app=exp()
var parser=require('body-parser')
require('./data/db.js');

var coCtrl = require('./controllers/co.controller');
app.use(parser.urlencoded({extended:true}))

app.get('/',function(req,resp){
	resp.render('co_form.ejs');
})
app.post('/',coCtrl.addOne);

app.get('/display',coCtrl.getAll );
var tool=[{name:'Ut1'},{name:'Ut2'},{name :'Pracs'}]//add here tool db
app.get('/tools',function(req,res){
	var tools=tool
	res.render('toolselector.ejs',{tools:tools})
});

app.listen(2535 , function () {
	console.log('Site is active ');
});
