const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const app = express();

const XLSX = require('xlsx');
const workbook = XLSX.readFile('./data/name.xlsx');

var header ="Test1 (20)";
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


var student = 0 , aboveAvg = 0 , totalMarks = 0;
for (let rowNum = rowTarget; rowNum <= range.e.r; rowNum++) {
    const Cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: colTarget})];
    if(Cell==undefined  || isNaN(Cell.w)){
      break;
    }
    else{
      totalMarks = totalMarks+ parseFloat(Cell.w);
      if(parseFloat(Cell.w) > 15){
        aboveAvg++;
      }
      student++;
    }
}
console.log("total students " + student);
console.log("avg marks " + totalMarks/student);
console.log("above Average students "+ aboveAvg);
