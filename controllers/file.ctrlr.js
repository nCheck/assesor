var mongoose = require('mongoose');





module.exports.loadPage = (req , res)=>{
  if(req.query.file){
    var filename = req.query.file;
    var file = true;
  }
    res.render('file-index', {subject : req.params.subject , req : req , filename : filename , file : file });

}
