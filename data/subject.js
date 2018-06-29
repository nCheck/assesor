var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubjectData = require('./subjectData');

var subjectSchema = new mongoose.Schema({
	name:String,
	subjectCode:String,
	subjectData:[{type : Schema.Types.ObjectId, ref: 'SubjectData'}],
});

module.exports.subjectSchema = subjectSchema;
mongoose.model('Subject' , subjectSchema);
