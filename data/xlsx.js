const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const app = express();

    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('./data/name.xlsx');
    //const sheet_name_list = workbook.SheetNames;
    //console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))


const sheet = workbook.Sheets[workbook.SheetNames[0]];
var range = XLSX.utils.decode_range(sheet['!ref']);
var colTarget = 6;
var rowTarget = 5;
var student = 0 , aboveAvg = 0 , totalMarks = 0;
for (let rowNum = rowTarget; rowNum <= range.e.r; rowNum++) {
    // Example: Get second cell in each row, i.e. Column "B"
    const Cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: colTarget})];
    if(Cell==undefined){
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
