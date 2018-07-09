var mongoose = require('mongoose');
require('./tool');
var Schema = mongoose.Schema;
var toolSchema = new mongoose.Schema({
		tool:             {type: Schema.Types.ObjectId, ref: 'Tool'},
		weightage:        Number,
		targetStudent:    Number,
		totalMark:        Number,
		totalStud:        Number,
		studentsAchieved: Number,
		toolType:         String,
		high:             Number,
		mid:              Number,
		low:              Number,
		point:            Number,
});

mongoose.model('ToolData' , toolSchema);
mongoose.model('ToolDefault',toolSchema);
module.exports.toolSchema = toolSchema;
