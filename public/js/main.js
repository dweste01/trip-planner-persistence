'use strict';
/* global $ tripModule */



var hotels, restaurants, activities;

$(apiMethods.getAll()
.then(([returnedhotels, returnedrestaurants, returnedactivities]) => {
	hotels = returnedhotels;
	restaurants = returnedrestaurants;
	activities = returnedactivities;
}).then((returnedPromise) => {
	createOptions()
	$(tripModule.load);
}).catch(console.error));