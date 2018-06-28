var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var passport  =   require('passport')
var coCtrl = require('../controllers/co.ctrlr');


router
  .route('/:subject')   //Displays Current CO Info
    .get((req , res)=>{
  res.render('dashboard', {subject : req.params.subject , req : req });
})

router
  .route('/:subject/Tool')
  .get( (req , res)=>{
    res.render('toolsAdd', {subject : req.params.subject });
    })
    .post((req , res)=>{
      res.send('tool alive '+req.params.subject);
      })

router
  .route('/:subject/CO')
    .get(coCtrl.getData)
      .post((req , res)=>{
        res.send('co_form alive '+req.params.subject);
        })


module.exports = router;
