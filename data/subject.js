var mongoose = require('mongoose');
var SubjectData = mongoose.model('SubjectData');

var subjectSchema = new mongoose.Schema({
	name:String,
	subjectCode:String,
	subjectData:[SubjectData],
});

mongoose.model('Subject' , subjectSchema);