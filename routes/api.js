var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var coCtrl = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');
var subjectCtrl = require('../controllers/subject.ctrl');

//====================================================================================================
//Displays tool and depending on which tool selected corresponding cos linked to it will be displayed
//====================================================================================================
router
  .route('/:subject/:year/co/:toolID')
  .get(coCtrl.getCO)
  .post(coCtrl.getCO)




// =============== sends all COS of subject

router
  .route('/:subject/:year/cos')
    .get(subjectCtrl.getCOs);

// =============== sends all tools within that CO

router
  .route('/:coID/tools')
    .get(coCtrl.getTools)

module.exports=router
