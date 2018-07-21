var mongoose = require('mongoose');

var express=require("express");
const multer = require('multer');
const path = require('path');
var parser=require('body-parser');

var app    = express();
app.use(parser.urlencoded({extended:true}));
const fs=require('fs');

module.exports.uploadFile = (req , res , next) =>{
	const storage = multer.diskStorage({
	  destination: './uploads/DBMS/2018/time-table',
	  fname: function(req, file, cb){
	    cb(null,"temp"  + path.extname(file.originalname));
	  }

	});
	var upload = multer({ storage: storage }).single('filename1'); //selected-file
	upload(req, res, (err) => {
		if(err){
			res.render('file-index',{
				msg:err
			});

			//res.send('err ' + err);
		} else {
			if(req.file == undefined){
			//res.send('Error: No File Selected!');
			res.render('file-index',{
				msg:'Error:No file Selected!!'
			});
			} else {
				console.log("shitted");
				// next();
					res.send('done');
        // res.render('file-index',{
				//	   msg:'File uploaded',
				 //
          //  file:`uploads/DBMS/2018/temp.jpg`
					//	 file: `DBMS/2018/${req.file.fname}`
		//	filename:req.query.file,
        //  file:'uploads/DBMS/2018/${req.query.file}'mp


        	//res.send('done');
      //  });

			}
		}
	});

}



module.exports.loadPage = (req , res)=>{
  if(req.query.file){
    var filename = req.query.file;
    var file = true;
  }
    res.render('file-index', {subject : req.params.subject , req : req , filename : filename , file : file });

}
