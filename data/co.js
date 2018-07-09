var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tool=require('./tool.js');


var coSchema = new mongoose.Schema({
	name : String,
	blooms : String,
	number: Number,
	tools:[{type:Schema.Types.ObjectId, ref: 'ToolData'}],
	attainment : {
		type : Number,
		default : 0
	},
});

module.exports.coSchema = coSchema;
mongoose.model('CO' , coSchema);
