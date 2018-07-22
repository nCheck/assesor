var mongoose = require('mongoose');

var express=require("express");
const multer = require('multer');
const path = require('path');
var parser=require('body-parser');

var app    = express();
app.use(parser.urlencoded({extended:true}));
const fs=require('fs');

module.exports.uploadFile = (req , res) =>{
	console.log(req.params.subject + " sub " + req.params.year + req.query.file);
	var subject = req.params.subject , year = req.params.year
								, filename = (req.query.file).replace(/ /g,''),
								destination = './uploads/'+subject+'/'+year+'/'+filename;
	const storage = multer.diskStorage({
	  destination: destination,
	  filename: function(req, file, cb){
	    cb(null,filename  + path.extname(file.originalname));
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
        res.render('file-index',{
					   msg:'File uploaded',
						 subject : req.params.subject, year : req.params.year , req : req , filename : filename , isfile : true ,
						 file : destination

       });

			}
		}
	});

}



module.exports.loadPage = (req , res)=>{
  if(req.query.file){
    var filename = req.query.file;
    var isfile = true;
  }
    res.render('file-index', {subject : req.params.subject, year : req.params.year , req : req , filename : filename , isfile : isfile });

}
