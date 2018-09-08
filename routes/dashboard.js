var express  = require('express');
var router   = express.Router();
var parser   = require('body-parser');
const dir    = __dirname;
var coCtrl   = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');
var User     = require('../data/user');
var Subject = require('../controllers/subject.ctrl');

// ============================
// Graph Route
// ============================

router
  .route('/graph/:subject/:year')
    .get(coCtrl.getCOGraph);


//==========================================
//Teacher's subject view(dashboard)
//==========================================
router
  .route('/')
  .get((req,res)=>{
    console.log("You clicked the main list of all subejcts for the teacher ")
      User.findOne({username:req.user.username}).populate('subjects').exec(function (err , user) {
        if(err){
            console.log("Err in getAll of User.ctrlr");
        }
        else{
            res.render('index' , {subjects : user.subjects , hidenav : true})
        }

    })
    });
//=======================================================
//Displays subject you selected from teacher's dashboard
//=======================================================
router
  .route('/:subject/:year')   //Displays Current CO Info
  .get((Subject.addSubjectByYear))

// router
//   .route('/:subject/:year')   //Displays Current CO Info
//     .get((req , res)=>{
//   res.render('dashboard', {subject : req.params.subject,year:req.params.year , req : req });
// })

//===================================================================================
//Displays all cos to the subject  and dynamically adds and  displays it immediately
//===================================================================================
router
  .route('/:subject/:year/CO')
    .get(coCtrl.getData)
      .post(coCtrl.addOne)


//=====================================================
//Removes CO
//=====================================================
router
  .route('/:subject/:year/CO/:coID/delete')
    .post(coCtrl.removeOneCO);

//===========================================================
//Gives user to input tool data information(target marks etc)
//===========================================================
router
  .route('/:subject/:year/CO/:coID/tool')
  .get(toolCtrl.getData)
    .post(toolCtrl.addOne);

router
//==========================================
//Removes tools
//==========================================
  .route('/:subject/:year/co/:coID/tool/:toolID/delete')
    .post(toolCtrl.removeOne);

//===============================================================
//Displays final table of co and its tools split up for a subject
//===============================================================

router
  .route('/:subject/:year/coReport')
  .get(coCtrl.COreport);



module.exports = router;
