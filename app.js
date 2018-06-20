var express = require('express') , 
	app		= express(),
	port	= 2535;



app.listen(port , function() {
	console.log('listening on '+ port);
});