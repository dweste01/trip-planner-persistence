const express = require('express');
const router = express.Router();

var Activity = require('../models').Activity;

router.get('/', function(req, res, next) {
	Activity.findAll()
	.then(activities => {
		res.json(activities);
	}).catch(next);
});

module.exports = router;