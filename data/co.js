var mongoose = require('mongoose');
var Tool=mongoose.model("Tool");

var coSchema = new mongoose.Schema({
	name : String,
	blooms : String,
	number: Number,
	tools:[Tool],
	attainment : Number,
});

mongoose.model('CO' , coSchema);