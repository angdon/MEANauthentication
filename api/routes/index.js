/* 
** The router file for the API. It works together 
** with the controller to perform specific function 
** calls.
** 
** @Author Angel Shiwakoti
*/

var express = require('express');
var router = express.Router();

var userController = require('../controllers/users.controller.js');

router
  .route('/users/signIn')
  .post(userController.signIn);

router
  .route('/users/signUp')
  .post(userController.signUp);


module.exports = router;