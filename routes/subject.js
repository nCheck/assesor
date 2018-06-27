var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var passport  =   require('passport')



router
  .route('/:subject')   //Displays Current CO Info
    .get((req , res)=>{
  res.send(req.params.subject);
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
    .get( (req , res)=>{
      res.render('co_form', {subject : req.params.subject});
      })
      .post((req , res)=>{
        res.send('co_form alive '+req.params.subject);
        })

module.exports = router;
