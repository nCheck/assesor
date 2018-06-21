var mongoose = require('mongoose');
var Co = mongoose.model('CO');

var subjDataSchema = new mongoose.Schema({
	year:Number,
	co:[Co.coSchema],

});

module.exports.subjDataSchema = subjDataSchema;
mongoose.model('SubjectData' , subjDataSchema);