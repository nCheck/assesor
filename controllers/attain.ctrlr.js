var mongoose = require('mongoose');
var CO = mongoose.model('CO');
var SubjectData = mongoose.model('SubjectData');
var Subject = mongoose.model('Subject');



module.exports.getCOPage = (req , res)=>{
  var subject = req.params.subject, year = req.params.year;

  SubjectData.findOne({name:subject , year : year} ).populate('co').exec( (err , doc)=>{
    cos = doc.co.map(function (co) {
      return co;
    })
    res.render('showCOs' , {cos : cos , req : req , subject : subject})
  })
}


module.exports.getToolPage = (req , res)=>{
	var coID = req.params.coID , subject = req.params.subject;

	CO.findById(coID).populate({
		path : 'tools' , populate : {
			path : 'tool',
			model : 'Tool'
		}
	}).exec((err , doc)=>{
    console.log("shited once "+doc);
		var tools = doc.tools.map(function (t) {return t;})
    res.render('showTools' , {tools : tools , req : req , subject : subject})
	})


}
