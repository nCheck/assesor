var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var coCtrl = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');

//====================================================================================================
//Displays tool and depending on which tool selected corresponding cos linked to it will be displayed
//====================================================================================================
router
  .route('/:subject/co/:toolID')   
  .get(coCtrl.getCO)
  .post(coCtrl.getCO)

module.exports=router
