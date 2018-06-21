var mongoose = require('mongoose');
var SubjectData = require('./subjectData');

var subjectSchema = new mongoose.Schema({
	name:String,
	subjectCode:String,
	subjectData:[SubjectData.subjDataSchema],
});

module.exports.subjectSchema = subjectSchema;
mongoose.model('Subject' , subjectSchema);