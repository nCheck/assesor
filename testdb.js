var mongoose = require('mongoose'),
	dbUrl	 = 'mongodb://localhost:27017/assesor';


mongoose.connect(dbUrl);
mongoose.connection.on('connected' , () =>{
	console.log('connected on port ' + 27017)
});

require('./data/tool');
require('./data/co');
require('./data/subjectData');
require('./data/subject');
require('./data/user');


