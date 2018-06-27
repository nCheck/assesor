// Your Requirments goes here
var express=require("express");
const multer = require('multer');
const path = require('path');
var parser=require('body-parser');

var app    = express();
app.use(parser.urlencoded({extended:true}));
const fs=require('fs');

module.exports.uploadFile = (req , res , next) =>{
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
				console.log("shitted");
				 // get the temporary location of the file
	//var tmp_path = req.file.temp.path;
	var tmp_path ='./uploads/temp.xlsx';
	// set where the file should actually exists - in this case it is in the "images" directory
	//var target_path = './public/images/' + req.file.temp.name;
	var target_path ='./public/images/'+temp.xlsx;
	// move the file from the temporary location to the intended location
	fs.rename('tmp_path', 'target_path', function(err) {
			if (err) throw err;
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink('tmp_path', function(err) {
					if (err) throw err;
					res.send('File uploaded to: ' + target_path );
			});
	});

	next();
			}
		}
	});

}
// try now! wait

//in comments i have written meaning of each
//Hi Shreya, you are just changing location here. haan wait
//hey nehhhhalllllll
//this is what i have done for deletion
// google pe tha
//kaha ho tum?
