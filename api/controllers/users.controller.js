/* 
** The controller for the API. This file interacts	
** with the database  
** 
** 
** @Author Angel Shiwakoti
*/

var mongoose = require('mongoose');
var User     = mongoose.model('User');
var jwt      = require('jsonwebtoken');
var bcrypt   = require('bcrypt-nodejs');

module.exports.signUp = function(req, res) {

	var email = req.body.email;
	var username = req.body.username;
	var name = req.body.name || null;
	var password = req.body.password;

	User.create({
		email: email,
		username: username,
		name: name,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	}, function(err, user) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(201).json(user);
		}
	});
};

module.exports.signIn = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	User.findOne({
		username: username
	}).exec(function(err, user) {
		if (err) {
			res.status(400).json(err);
		} else {
			if (!user) {
				res.status(401).json({success: false, message: 'The username or password is incorrect.'});
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
					res.status(200).json({success: true, token: token});
				} else {
					res.status(401).json({success: false, message: 'The username or password is incorrect.'});
				}

			}
		}
	});
};