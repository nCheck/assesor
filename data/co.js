var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tool=require('./tool.js');
var lastMod = require('./lastMod');
var CODump = mongoose.model('CODump')


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

coSchema.post('remove',function(doc) {
	console.log(' Creating dump of Removing!');
	CODump.create({
		name : doc.name,
		blooms : doc.blooms,
		number : doc.number , 
		attainment : doc.attainment
	} , (err , doc)=>{
		console.log("created dump of " , doc)
	})
  });

coSchema.plugin(lastMod)

module.exports.coSchema = coSchema;
mongoose.model('CO' , coSchema);
