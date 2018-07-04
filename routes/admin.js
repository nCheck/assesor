var exp     = require('express'),
router      = exp.Router();
var Subject = require('../controllers/subject.ctrl');


//==========================================
//Main admin page
//==========================================
router
  .route('/')
  .get((req,res)=>{
    res.render('admin.ejs',{req:req})
  });


//==========================================
//Assigns course to a specific teacher
//==========================================
router
  .route('/assign')
  .post((Subject.assignCourse))

//==========================================
//Adds Subject and Subject id to db
//==========================================
router
  .route('/addsubject')
  .get((req,res)=>res.render('addSubject.ejs',{req:req}))
  .post((Subject.addSubject))

  
module.exports=router;
