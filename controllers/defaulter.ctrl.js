const XLSX     = require('xlsx');

module.exports.getDefaulter = (req , res)=>{
	
		res.render('defaulterUpload', {subject : req.params.subject , year : req.params.year,
			req : req});
	
}

module.exports.defaulterCal = (req , res)=>{


}