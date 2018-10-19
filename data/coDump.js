var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tool=require('./tool.js');
var lastMod = require('./lastMod');

var coSchema = new mongoose.Schema({
	name : String,
	blooms : String,
	number: Number,
	attainment : {
		type : Number,
		default : 0
	},
});


coSchema.plugin(lastMod)

module.exports.coSchema = coSchema;
mongoose.model('CODump' , coSchema);