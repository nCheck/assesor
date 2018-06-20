var mongoose = require('mongoose'),
	dbUrl	 = 'mongodb://sanes4:sanes4ever@ds163330.mlab.com:63330/assesor';

mongoose.connect(dbUrl);
mongoose.connection.on('connected' , () =>{
	console.log('connected')
});

