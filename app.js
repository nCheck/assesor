var exp=require('express')
var app=exp()
var parser=require('body-parser')
require('./data/db.js');

var coCtrl = require('./controllers/co.controller');
var toCtrl = require('./controllers/tool.controller');
app.use(parser.urlencoded({extended:true}))

app.get('/',function(req,resp){
	resp.render('co_form.ejs');
})
app.post('/',coCtrl.addOne);

app.get('/display',coCtrl.getAll );
var tool=[{name:'Ut1'},{name:'Ut2'},{name:'Pracs'},{name:'Free'}]
var coos=[{co:'Learn'},{co:'Study'},{co:'Play'}];
app.get('/add/tools',function(req,res){
	var tools=tool
	cos=coos;

	tool = toCtrl.getAll ;
	cos  = coCtrl.getAll ;
	res.render('toolselector.ejs',{tools:tools,
			cos:cos});
});

app.get('/tools' , toCtrl.getAll );
app.post('/tools' , toCtrl.addOne);
app.get('/toolform' , function (req, res) {
	res.render('toolsAdd.ejs');
})

app.listen(2535 , function () {
	console.log('Site is active ');
});
