
var express = require('express') ,
	app		= express(),
	bodyParser=require('body-parser'),
	port	= 2535;

require('./data/db.js');

app.listen(port , function() {
	console.log('listening on '+ port);
});