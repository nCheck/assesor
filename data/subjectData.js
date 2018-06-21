var mongoose = require('mongoose');
var Co = mongoose.model('CO');

var subjDataSchema = new mongoose.Schema({
	year:Number,
	co:[Co],

});

mongoose.model('SubjectData' , subjDataSchema);