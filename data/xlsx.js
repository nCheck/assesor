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
for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    // Example: Get second cell in each row, i.e. Column "B"
    const secondCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 6})];
    // NOTE: secondCell is undefined if it does not exist (i.e. if its empty)
    console.log(secondCell); // secondCell.v contains the value, i.e. string or number
}

//var range = XLSX.utils.decode_range(workbook.Sheets[workbook.SheetNames[0]]["!ref"]); //get the range
            var sh = XLSX.utils.sheet_to_json(sheet, {header:1, raw:true}); //generates worksheet object into array of json objects

            //console.log(sh[1][1]);

 // var flag=0;
 //           for(var k=2; k<=range.e.r; k++)
 //           {
 //              for(var g=0; g<=range.e.c; g++)
 //                {
 //                    if(sh[k][g] == sh[1][1])
 //                    {
 //                        flag=1;
 //                        break;
 //                    }
 //                }
 //                if(flag==1)
 //                    break;
 //            }

 			// for(var i=0;i<=range.e.r;i++)
 			// {
 			// 	for(var j=0;j<=range.e.c;j++)
 			// 	{
 			// 		if(sh[i][j]!=undefined)
 			// 		console.log(sh[i][j]);
 			// 	}
 			// 	console.log("\n");
 			// }

             var totalStud=0, numStud=0;
  
				g=6;
				k=6;
				c=0;
            for(var p=k; p<=range.e.r; p++)
            {
               if( (parseFloat(sh[p][g])==undefined)  || typeof parseFloat(sh[p][g])=="string"){
                   break; 
               	}
              
               if(parseFloat(sh[p][g]) >= 15 ) 
                 	numStud++;
               if(parseFloat(sh[p][g]) <21 )
               		totalStud++;
              	
             }
             console.log("undefined are = "+c);
             console.log("Successful Students = "+numStud);
             console.log("Total are = "+totalStud);
         


