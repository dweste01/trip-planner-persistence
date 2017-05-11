var Hotel = require('../models').Hotel;

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	Hotel.findAll()
	.then(hotels => {
		res.json(hotels);
	}).catch(next);
});

module.exports = router;