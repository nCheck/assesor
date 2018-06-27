var mongoose = require('mongoose');
var Co = require('./co');

var subjDataSchema = new mongoose.Schema({
	name : String,
	year:Number,
	co:[Co.coSchema],

});

module.exports.subjDataSchema = subjDataSchema;
mongoose.model('SubjectData' , subjDataSchema);
