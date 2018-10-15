const XLSX     = require('xlsx');
var mongoose = require('mongoose');
const Student = mongoose.model('Student');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanesassesor@gmail.com',
    pass: 'sanes4ever'
  }
});

module.exports.getDefaulter = (req , res)=>{

		res.render('defaulterUpload', {subject : req.params.subject , year : req.params.year,
			req : req});

	
}





module.exports.defaulterCal = (req , res )=>{
	var sheetNo= req.body.sno - 1 ;
	console.log("In defaulter.cntrllr and sheet no is "+sheetNo);
	var studentname	=	req.body.shno;
	var attendance	=   req.body.ah ;
	var minPercentage = req.body.minp - 0;

	console.log(sheetNo , studentname , attendance , minPercentage)

	const workbook = XLSX.readFile('./uploads/temp.xlsx');
	var flag=0;
	var temp=0;
	var student_count=0;
	var array = [];
	const sheet = workbook.Sheets[workbook.SheetNames[parseInt(sheetNo)]];
	var range = XLSX.utils.decode_range(sheet['!ref']);

	for (var rowNum = range.s.r ; rowNum <= range.e.r; rowNum++)
	{
		for (var colNum = range.s.c; colNum <= range.e.c; colNum++)
		{
			var Cell = sheet[XLSX.utils.encode_cell({c: colNum,r:rowNum})];
			if(Cell==undefined)
			{
				break;
			}
			else
			{
				if(!(Cell.t == 's' || Cell.t == 'str')) continue; //skip if cell is not text
		// 			console.log("cell name "+Cell.v);
					if(Cell.v == studentname && flag != 1){
						var rowName=rowNum+1;
						var colName=colNum;
						flag=1;
					}
					if(Cell.v == attendance && temp != 1){
						var rowAttendance=rowNum+1;
						var colAttendance=colNum;
						temp=1;
					}
			}
		}
		if(flag==1 && temp==1)
			break;
	}
	console.log("row"+rowName);
	console.log("col"+colName);
	console.log("row"+rowAttendance);
	console.log("col"+colAttendance);
	if(( isNaN(rowName) || isNaN(colName)) &&(( isNaN(rowAttendance) || isNaN(colAttendance)) )  ){
	//	res.send({tool:[] , co: [] , error : true})
	}

	else{
		for (let rowNum =rowAttendance; rowNum <= range.e.r; rowNum++) {
				const Cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: colAttendance})];
				if(Cell==undefined  || isNaN(Cell.w)){
					break;
				}
				else{

					if((parseFloat(Cell.w))<minPercentage){
						student_count++;
						const Name = sheet[XLSX.utils.encode_cell({r: rowNum, c: colName})];
						array.push(Name.v);						
					}
				}
			}
			Student.find({rollno : {
				$in : array
			}} , (err , doc)=>{
				var emails = ""
				doc.forEach(d => {
					emails += (d.email)+","
				});
				console.log(emails)
				res.render( 'email' ,  { emails : emails, 
					subject : req.params.subject , year : req.params.year,
					req : req});
			})


		}
}

module.exports.sendMail = (req , res)=>{
    var to = req.body.to,
        subject = req.body.subject,
        text = req.body.body
        var mailOptions = {
            from: 'sanesassesor@gmail.com',
            to: to,
            subject: subject,
            text: text,
            // attachments :[
            //   {   // file on disk as an attachment
            //       filename: 'Indez',
            //       path: './key.json' // stream this file
            //   }
            // ]
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.send(err)
            } else {
              console.log('Email sent: ' + info.response);
              res.redirect(`/dashboard/${req.body.sub}/${req.body.year}`)
            }
          });  
}