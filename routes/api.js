var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var coCtrl = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');


router
  .route('/:subject/co/:toolID')   //Displays Current CO Info
    .get(coCtrl.getCO)

module.exports=router
