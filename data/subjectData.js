var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Co = require('./co');

var subjDataSchema = new mongoose.Schema({
	name : String,
	year:Number,
	co:[{type : Schema.Types.ObjectId, ref: 'CO'}],

});

module.exports.subjDataSchema = subjDataSchema;
mongoose.model('SubjectData' , subjDataSchema);
