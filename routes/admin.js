var exp=require('express'),
router=exp.Router();
var Subject=require('../controllers/subject.ctrl')
router
  .route('/')
  .get((req,res)=>res.render('admin.ejs'))

router
  .route('/assign')
  .post((Subject.addOne))
    // var courseName=req.body.courseName,
    //     teachers  =req.body.teacherName;
    // res.render('assign',{courseName:courseName,teacherName:teachers})})

module.exports=router;
