var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Co = require('./co');
var lastMod = require('./lastMod');

var subjDataSchema = new mongoose.Schema({
	name : String,
	year:Number,
	co:[{type : Schema.Types.ObjectId, ref: 'CO'}],

});

subjDataSchema.plugin(lastMod)

module.exports.subjDataSchema = subjDataSchema;
mongoose.model('SubjectData' , subjDataSchema);
mongoose.model('SubjectDataDump' ,subjDataSchema);