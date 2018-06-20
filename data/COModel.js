var mongoose = require('mongoose');
var toolSchema = require('./toolModel');

var coSchema = new mongoose.Schema({
	coNum = Number;
	coName = String;
	blooms = Number;
	tools= [toolSchema];

});

mongoose.model('CO',coSchema, cos);