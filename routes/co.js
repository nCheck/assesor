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
  .route('/addTool')
  .get( (req , res)=>{
    res.render('toolsAdd');
    })
    
module.exports = router;
