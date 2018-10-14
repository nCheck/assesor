const XLSX     = require('xlsx');


module.exports.getDefaulter = (req , res)=>{

		res.render('defaulterUpload', {subject : req.params.subject , year : req.params.year,
			req : req});
<<<<<<< HEAD
	
}

module.exports.defaulterCal = (req , res)=>{


}
=======

}
module.exports.defaulterCal = (req , res )=>{
var sheetNo=Integer.parseInt(req.body.Sheet_Number) - 1 ;
console.log("In defaulter.cntrllr and sheet no is "+sheetNo);
var studentname=req.body.Student_Name_Header;
var attendance=req.body.Attendance_Header;
var minPercentage=req.body.Minimum_Percentage;


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
				if(Cell.v == studentname){
					var rowName=rowNum+1;
					var colName=colNum;
					flag=1;
					break;
				}
				if(Cell.v == attendance){
					var rowAttendance=rowNum+1;
					var colAttendance=colNum;
					temp=1;
					break;
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

				if((parseFloat(Cell.w))<minPercentage)
				student_count++;
				const Name = sheet[XLSX.utils.encode_cell({r: rowNum, c: colName})];
				array.push(Name);
			}
		}
			console.log(array)
			res.send({array});

	}
}
>>>>>>> master
