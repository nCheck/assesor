var express  = require('express');
var router   = express.Router();
var parser   = require('body-parser');
const dir    = __dirname;
var coCtrl   = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');
var User     = require('../data/user');


router
  .route('/:subject')   //Displays Current CO Info
    .get((req , res)=>{
  res.render('dashboard', {subject : req.params.subject , req : req });
})

router
  .route('/:subject/co/:coID/Tool')
  .get(toolCtrl.sendTool)
    .post(toolCtrl.addOne);

router
  .route('/:subject/CO')
    .get(coCtrl.getData)
      .post(coCtrl.addOne)


router
  .route('/co/:coID/:toolID/delete')
    .get(toolCtrl.removeOne)

//Teacher's subject view
router
  .route('/')
  .get((req,res)=>{

      console.log("Hello from subjects");
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
