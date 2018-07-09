var express  = require('express');
var router   = express.Router();
var parser   = require('body-parser');
const dir    = __dirname;
var coCtrl   = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');
var User     = require('../data/user');


// ============================
// Graph Route
// ============================

router
  .route('/graph/:subject')
    .get(coCtrl.getCOGraph);


//==========================================
//Displays subject assigned to teacher
//==========================================
router
  .route('/:subject')   //Displays Current CO Info
    .get((req , res)=>{
  res.render('dashboard', {subject : req.params.subject , req : req });
})
//===========================================================
//Gives user to input tool data information(target marks etc)
//===========================================================
router
  .route('/:subject/co/:coID/Tool')
  .get(toolCtrl.sendTool)
    .post(toolCtrl.addOne);
//===================================================================================
//Displays all cos to the subject  and dynamically adds and  displays it immediately
//===================================================================================
router
  .route('/:subject/CO')
    .get(coCtrl.getData)
      .post(coCtrl.addOne)

//==========================================
//Removes tools
//==========================================
router
  .route('/co/:coID/:toolID/delete')
    .get(toolCtrl.removeOne)


//==========================================
//Teacher's subject view
//==========================================
router
  .route('/')
  .get((req,res)=>{
      User.findOne({username:req.user.username}).populate('subjects').exec(function (err , user) {
        if(err){
            console.log("Err in getAll of User.ctrlr");
        }
        else{
            res.render('index' , {subjects : user.subjects , hidenav : true})
        }

    })
    });


module.exports = router;
