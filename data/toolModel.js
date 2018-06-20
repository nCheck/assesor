var mongoose = require('mongoose');

var toolSchema = new mongoose.Schema({
		toolName = String;
		toolNum = Number;
		targetStudent = Number;
		targetMark = Number;
		totalStud = Number;
		attainment = Number;
});

module.exports(toolSchema);

mongoose.model('Tool',toolSchema, tools);