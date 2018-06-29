var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tool=require('./tool.js');


var coSchema = new mongoose.Schema({
	name : String,
	blooms : String,
	number: Number,
	tools:[{type:Schema.Types.ObjectId, ref: 'Tool'}],
	attainment : Number,
});

module.exports.coSchema = coSchema;
mongoose.model('CO' , coSchema);
