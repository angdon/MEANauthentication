/* 
** The connection file connects the app with the MONGODB
** database. 
** 
** @Author Angel Shiwakoti
*/

var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/MEANAuthentication';
var retry = null;
mongoose.connect(dburl);


mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});


function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    callback();
  });
}



process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});


// BRING IN YOUR USERS SCHEMA AND MODEL
require('./users.model');