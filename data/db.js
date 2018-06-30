var mongoose = require('mongoose'),
	dbUrl	 = 'mongodb://sanes4:sanes4ever@ds121871.mlab.com:21871/testassesor';

mongoose.connect(dbUrl);
mongoose.connection.on('connected' , () =>{
	console.log('connected')
});

require('./tool');
require('./toolData');
require('./co');
require('./subjectData');
require('./subject');
require('./user');
