var Promise = require('bluebird');
var router = require('express').Router();

var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;

var hotelRoutes = require('./hotels.js');
var activityRoutes = require('./activities.js');
var restaurantRoutes = require('./restaurants.js');
var dayRoutes = require('./days.js');

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

module.exports = router;


router.use('/api/hotels', hotelRoutes);
router.use('/api/restaurants', restaurantRoutes);
router.use('/api/activities', activityRoutes);
router.use('/api/days', dayRoutes);