
var mongoose = require('mongoose'),

	dbUrl	 = 'mongodb://sanes4:sanes4ever@ds121871.mlab.com:21871/testassesor';
  mongoose.connect(dbUrl);
  mongoose.connection.on('connected' , () =>{
  	console.log('connected')
  });

var Schema=mongoose.Schema;
var graphSchema =new Schema({
    DATA:[Number],
});

var data =mongoose.model('data',graphSchema);

data.findById("5b3bc5db4e6c9721927aec6a", function(err,data) {

  if (err) throw err;
  console.log(data);
});
