var exp=require('express')
var app=exp()
var parser=require('body-parser')

app.use(parser.urlencoded({extended:true}))
app.get('/',function(req,resp){
	resp.render('co_form.ejs');
})
app.post('/',)
app.post('/display',function(req,resp){
	var co=req.body.cname
	resp.render('codisp.ejs',{co:co})
})
app.listen(3000);
