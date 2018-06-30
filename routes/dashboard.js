var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var coCtrl = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');

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

module.exports = router;
