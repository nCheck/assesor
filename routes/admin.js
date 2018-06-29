var exp=require('express'),
router=exp.Router();
var Subject=require('../controllers/subject.ctrl')
router
  .route('/')
  .get((req,res)=>{
    res.render('admin.ejs')
  });

router
  .route('/assign')
  .post((Subject.assignCourse))
    // var courseName=req.body.courseName,
    //     teachers  =req.body.teacherName;
    // res.render('assign',{courseName:courseName,teacherName:teachers})})
router
  .route('/addsubject')
  .get((req,res)=>res.render('addSubject.ejs'))
  .post((Subject.addSubject))
module.exports=router;
