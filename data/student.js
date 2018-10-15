var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stuSchema = new Schema({
  name : String,
  rollno : Number , 
  email : String
})

mongoose.model('Student' , stuSchema);