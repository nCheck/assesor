var exp=require('express')
var app=exp()
var parser=require('body-parser')
require('./data/db.js');

var coCtrl = require('./controllers/co.ctrlr');
var toCtrl = require('./controllers/tool.ctrlr');
var uploadCtrl = require('./controllers/upload.ctrlr');
app.use(parser.urlencoded({extended:true}))

// app.get('/',function(req,resp){
// 	resp.render('co_form.ejs');
// })
// app.post('/',coCtrl.addOne);
//
// app.get('/display',coCtrl.getAll );
// app.get('/add/tools', coCtrl.sendBoth);
// app.post('/add/tools' , coCtrl.insertTool);
//
// app.get('/tools' , toCtrl.getAll );
// app.post('/tools' , toCtrl.addOne);
// app.get('/toolform' , function (req, res) {
// 	res.render('toolsAdd.ejs');
// })

app.get('/upload' , (req ,res)=>{
	res.render('upload.ejs');
});
app.post('/upload', uploadCtrl.uploadFile);


app.listen(2535 , function () {
	console.log('Site is active on 2535');
});
