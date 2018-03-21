/// <reference path="../../../../typings/tsd.d.ts" />
"use strict";
var express = require("express");
var userController = require('./userController');
var router = express.Router();
var isLoggedIn = require('../isloggedin/isLoggedIn');
router.post('/signout', isLoggedIn, userController.userSignout);
router.post('/signin', userController.userSignin);

module.exports = router;
