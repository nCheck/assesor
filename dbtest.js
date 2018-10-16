var mongoose = require('mongoose'),
	realDB	 = 'mongodb://sanes4:sanes4ever@ds147461.mlab.com:47461/assesor',
	testDB	 = 'mongodb://sanes4:sanes4ever@ds121871.mlab.com:21871/testassesor';

mongoose.connect(realDB);
mongoose.connection.on('connected' , () =>{
	console.log('connected')
});




require('./tool');
require('./toolData');
require('./co');
require('./subjectData');
require('./subject');
require('./user');
