var express		= require('express');
var router    = exppress.Router();
var parser    = require('body-parser');
const dir 		= __dirname;
var User 		 =    require('./data/user');
var passport  =   require('passport')
var app			   =   express();
