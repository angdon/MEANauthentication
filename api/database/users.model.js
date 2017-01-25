/* 
** This file is the schema for User Collections. 
** It describes all the fields present in the collection
** along with additional information.
**
** @Author Angel Shiwakoti
*/

var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('User', usersSchema);