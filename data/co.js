var mongoose = require('mongoose');
var Tool=require('./tool.js');


var coSchema = new mongoose.Schema({
	name : String,
	blooms : String,
	number: Number,
	tools:[Tool.toolSchema],
	attainment : Number,
});

module.exports.coSchema = coSchema;
mongoose.model('CO' , coSchema);