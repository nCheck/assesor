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
    if(coID == undefined || err){
      console.log("err " + err);
      res.send(err)
    }
    console.log("shited once "+doc);
		var tools = doc.tools.map(function (t) {return t;})

    res.render('showTools' , {tools : tools , req : req , subject : subject, coID : coID})


    res.render('showTools' , {tools : tools , req : req , subject : subject})

	})


}
module.exports.coattainment=(req,res)=>{
var coID=req.params.coID;
var direct_type=0,indirect_type=0,co_val=0;
CO.findById(coID).populate({
  path : 'tools' , populate : {
    path : 'tool',
    model : 'Tool'
  }
}).exec((err , cos)=>{
	var tools = cos.tools.map(function (t) {return t;})
console.log("This is co "+cos);
  tools.forEach(function(tool){
    if(tool.toolType==='Direct')
      direct_type+=tool.weightage*tool.point;
  else {
        indirect_type+=tool.weightage*tool.point;
      }
  })
co_val=direct_type*0.8+indirect_type*0.2;
cos.attainment=co_val;
res.redirect('/attain/req.query.subject/req.query.year/cos')
});
}
