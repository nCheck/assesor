var express = require('express') , 
	app		= express(),
	bodyParser=require('body-parser'),
	port	= 2535;



app.listen(port , function() {
	console.log('listening on '+ port);
});