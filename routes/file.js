var express		= require('express');
var router    = express.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var coCtrl = require('../controllers/co.ctrlr');
var toolCtrl = require('../controllers/tool.ctrlr');
var subjectCtrl = require('../controllers/subject.ctrl');
var attainCtrl = require('../controllers/attain.ctrlr');
var fileCtrl = require('../controllers/file.ctrlr');


router
  .route('/:subject')   //File HomePage
    .get(fileCtrl.loadPage)














module.exports=router
