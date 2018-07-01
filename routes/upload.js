var express    = require('express');
var router     = express.Router();
var parser     = require('body-parser');
const dir      = __dirname;
var coCtrl     = require('../controllers/co.ctrlr');
var toolCtrl   = require('../controllers/tool.ctrlr');
var uploadCtrl = require('../controllers/upload.ctrlr');
var xlsx       = require('../controllers/xlsx.ctrlr');

router
.route('/')
.get((req,res)=>res.render('upload'))
.post( uploadCtrl.uploadFile);
// , xlsx.xlsxCal , uploadCtrl.deleteFile
router
  .route('/:subject/tool')   //Displays Current CO Info
    .get(toolCtrl.getToolDoc)
router
.route('/:subject/tool/:toolID/cos')
.get(coCtrl.getCO)
.post(xlsx.xlsxCal,
)
module.exports=router
