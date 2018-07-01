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
	var upload = multer({ storage: storage }).single('selected-file');
	upload(req, res, (err) => {
		if(err){
			res.send('err ' + err);
		} else {
			if(req.file == undefined){
				res.send('Error: No File Selected!');
			} else {
				console.log("shitted");
				// next();
				res.send('done');
			}
		}
	});

}

module.exports.deleteFile = (req , res ) =>{

	var tmp_path ='./uploads/temp.xlsx';
	fs.unlink(tmp_path, function(err) {
			if (err) throw err;
			console.log('File uploaded Deleted ' );
	});
	res.send('Done');
}


// try now! wait

//in comments i have written meaning of each
//Hi Shreya, you are just changing location here. haan wait
//hey nehhhhalllllll
//this is what i have done for deletion
// google pe tha
//kaha ho tum?
