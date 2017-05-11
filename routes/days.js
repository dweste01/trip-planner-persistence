const express = require('express');
const router = express.Router();

const Day = require('../models').Day;
const Restaurant = require('../models').Restaurant;
const Activity = require('../models').Activity;
const Hotel = require('../models').Hotel;


// get one specific day
router.get('/:id', function(req, res, next) {
	Day.findById(req.params.id)
	.then(day => {
		// console.log(day);
		res.json(day);
	})
})


// get all days and their restaurant and activity ID's
router.get('/', function(req, res, next) {
	Day.findAll({
		include:[{model: Restaurant,
					as: 'restaurants',
				through: {attributes: ['id']}
				},
				{model: Activity,
					as: 'activities',
				through: {attributes: ['id']}
				},
				{model: Hotel,
					as: 'hotel'
				}],
		order: ['number'] 
	})
	.then(days => {
		res.json(days);
	})
})


// add a new day
router.post('/', function(req, res, next) {
	console.log(req.body)
	Day.create({ number: req.body.number }).then((dayCreated) => res.json(dayCreated))
})

// delete entire day
router.delete('/:number', function(req, res, next) {
	Day.findOne({
		where: { number: req.params.number }
	})
	.then(day => {
		day.destroy();
	}).then(()=> res.sendStatus(200)).catch(next);
});

router.put('/:number', function(req, res, next) {
	Day.findOne({
		where: { number: req.params.number }
	})
	.then(day => {
		day.update({
			number: day.number - 1,
		})
	}).then(() =>res.sendStatus(200)).catch(next);
})

// Add a restaurant to a day
router.post('/:number/restaurant', function(req, res, next) {
	Day.findOne({
		where: {
			number: req.params.number
		}
	}).then(day => {
		return day.addRestaurant([req.body.id]);
	}).then( () => res.sendStatus(200)).catch(next)
	

})

// Remove a restaurant from a day
router.delete('/:number/restaurant/:resId', function(req, res, next) {
	Day.findOne({
		where: {
			number: req.params.number
		}
	}).then(day => {
		day.removeRestaurant(req.params.resId);
	}).then( () => res.sendStatus(200)).catch(next)
})


// Add a hotel to a day
router.post('/:number/hotel', function(req, res, next) {
	Day.findOne({
		where: {
			number: req.params.number
		}
	}).then(day => {
		return day.setHotel(Number(req.body.id));
	}).then( () => res.sendStatus(200)).catch(next)
})

// Remove a hotel from a day
router.delete('/:number/hotel/:hotelId', function(req, res, next) {
	Day.findOne({
		where: {
			number: req.params.number
		}
	}).then(day => {
		return day.setHotel(null);
	}).then( () => res.sendStatus(200)).catch(next)
})


// Add an activity to a day
router.post('/:number/activity', function(req, res, next) {
	Day.findOne({
		where: {
			number: req.params.number
		}
	}).then(day => {
		return day.addActivity([req.body.id]);
	}).then( () => res.sendStatus(200)).catch(next)
})

// Remove an activity to a day
router.delete('/:number/activity/:actId', function(req, res, next) {
	Day.findOne({
		where: {
			number: req.params.number
		}
	}).then(day => {
		return day.removeActivity(req.params.actId);
	}).then( () => res.sendStatus(200)).catch(next)
})



module.exports = router;