const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const app = express();


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('SampleFile');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|txt|sh|js/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  //const mimetype = filetypes.test(file.mimetype);

  //if(mimetype && extname){
    if(extname){
    return cb(null,true);
  } else {
    cb('Error: Wrong File Type!');
  }
}


// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('load'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('load', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('load', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('load', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));