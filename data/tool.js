var mongoose = require('mongoose');

var toolSchema = new mongoose.Schema({
		name : String,
		weightage : Number,
		targetStudent : Number,
		targetMark : Number,
		totalStud : Number,
		directAttain : Number,
		indirectAttain : Number,
		high : Number,
		mid : Number,
		low : Number,
		point : Number,
});

module.exports.toolSchema = toolSchema;
mongoose.model('Tool' , toolSchema);
mongoose.model('ToolDefault',toolSchema);


