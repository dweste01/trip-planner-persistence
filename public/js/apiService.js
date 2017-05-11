'use strict'


var apiMethods = (function() {

	// returns promise for a value
	function getAllHotels() {
		return $.ajax({
			method: "GET",
			url: '/api/hotels'
		});
	}

	// returns promise for a value
	function getAllRestaurants() {
		return $.ajax({
			method: "GET",
			url: '/api/restaurants'
		});
	}

	// returns promise for a value
	function getAllActivities() {
		return $.ajax({
			method: "GET",
			url: '/api/activities'
		});
	}

	return {
		getAllActivities,
		getAllRestaurants,
		getAllHotels,
		getAll: function() { 		// return a single resolved promise whose value is the array of all three resolved promises
			return Promise.all([getAllHotels(), getAllRestaurants(), getAllActivities()])
		}
	}
})();