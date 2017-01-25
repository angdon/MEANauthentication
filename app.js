/* 
** This file runs first when the node server starts.	
** This file contains all the main logic like loading databases,
** setting ports, enabling routes etc. 
** 
** @Author Angel Shiwakoti
*/

require('./api/database/connection.js');
var express = require('express');
var app = express();
var path  = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', 3000);

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Enable parsing for posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add additional routes
app.use('/api', routes);

// Listen for requests in the specified port
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
});