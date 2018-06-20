var mongoose = require('mongoose');
var toolSchema = require('./toolModel').toolSchema;

var coSchema = new mongoose.Schema({
	coNum : Number,
	coName : String,
	blooms : String,
	tools : [toolSchema]

});

module.exports =  mongoose.model('CO',coSchema);