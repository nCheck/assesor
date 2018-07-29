const express  = require('express');//haa wait
const multer   = require('multer');
const ejs      = require('ejs');
const path     = require('path');
const mongoose = require('mongoose');
const app      = express();
const XLSX     = require('xlsx');
const ToolData = mongoose.model('ToolData');
const  CO      = mongoose.model('CO');

module.exports.xlsxCal = (req , res )=>{
var header=req.body.header;
console.log(req.body);
var toolID=req.params.toolID , co_id = req.params.coID;
console.log("Course id  "+co_id);



CO.findById(co_id).populate('tools').exec(function(err,co){
	var tools = co.tools.map(function(a) { return a; });
	console.log("HEre orginal "+co.tools);
	console.log(tools);
  var arr = tools;
  var ids = arr.map(function(arr) {return arr._id; });

ToolData.findOne( { _id :{$in : ids} , tool : toolID } ,function(err,tool){


  var high,mid,low,student = 0 , aboveAvg = 0 , totalMarks = 0,targetMark,c_count=0;
  high=tool.high;
  mid=tool.mid;
  low=tool.low;

	targetMark=tool.targetMark/100*tool.totalMark;
  console.log("All information of the tool "+tool);
console.log("Target marks not in percentage  "+targetMark);
//    console.log("req.body her is header name to search "+req.body.header[0]);
  //console.log("her is header name to search "+header[0]);
  const workbook = XLSX.readFile('./uploads/temp.xlsx');
  var flag=0;
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
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
          if(Cell.v == header){
            var rowTarget=rowNum+1;
            var colTarget=colNum;
            flag=1;
            break;
          }
      }
    }
    if(flag==1)
      break;
  }
  console.log("row"+rowTarget);
  console.log("col"+colTarget);



  for (let rowNum = rowTarget; rowNum <= range.e.r; rowNum++) {
      const Cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: colTarget})];
      if(Cell==undefined  || isNaN(Cell.w)){
        break;
      }
      else{

        if(parseFloat(Cell.w)>=targetMark)
          c_count++;
        student++;
      }
		}
			tool.totalStud=student;
			tool.studentsAchieved=c_count;
      console.log("total students "+student);
      var percentH=c_count/student*100;
          console.log("percentage OF STUDENT ACHIEVING TARGET : "+percentH);
			if(percentH>=high)
        {
					tool.point=3;
				}
      else if(percentH>=mid)
      {
				tool.point=2;
			}
      else if(percentH>=low)
      {
				tool.point=1;
			}
      else {
        tool.point=0;
      }
			tool.save();
      console.log("Point inserted is "+tool.point)
      console.log(tool)

			res.send({tool:tool,co:co});

})
})

}
