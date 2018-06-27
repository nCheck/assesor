// Your Requirments goes here
var express=require("express");
const multer = require('multer');
const path = require('path');
var parser=require('body-parser');
var xlsx = require('../data/xlsx');
var app    = express();
app.use(parser.urlencoded({extended:true}));

module.exports.uploadFile = (req , res) =>{
	const storage = multer.diskStorage({
	  destination: './uploads/',
	  filename: function(req, file, cb){
	    cb(null,"temp"  + path.extname(file.originalname));
	  }
	});
	var upload = multer({ storage: storage }).single('timetable');
	upload(req, res, (err) => {
		if(err){
			res.send('err ' + err);
		} else {
			if(req.file == undefined){
				res.send('Error: No File Selected!');
			} else {
				xlsx.xlsxCal;

			}
		}
	});

}
