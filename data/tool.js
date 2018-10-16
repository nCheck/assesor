var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toolSchema = new Schema({
  name : String
})

mongoose.model('Tool' , toolSchema);
mongoose.model('ToolDump' , toolSchema);