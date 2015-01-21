/* global moment */
/* global math */
'use strict';

/**
 * @ngdoc service
 * @name hyenaReservationsApp.ReservationService
 * @description
 * # ReservationService
 * Service in the hyenaReservationsApp.
 */
angular.module('hyenaReservationsApp')
  .service('ReservationService', function ($firebase, AppFirebase) {
  	var reservationsRef = AppFirebase.getRef();
    
  	var ReservationService = {
  		assets: function getAssets(groupId, limit) {
  			limit = limit || 20;
  			groupId = parseInt(groupId);
  			var assetRef = reservationsRef.child('assets').orderByChild("group_id").equalTo(groupId).limitToFirst(limit);
  			return $firebase(assetRef);
  		},
  		asset: function getAsset(assetId) {
  			return $firebase(reservationsRef.child('/assets/'+assetId));
  		},
  		add: function addAsset(asset) {
  			return $firebase(reservationsRef.child('/assets')).$push(asset);
  		},
  		remove: function removeAsset(assetId) {
  			return $firebase(reservationsRef.child('/assets/'+assetId)).$remove();
  		},
  		schedule: function getSchedule(assetId) {
  			var asset = ReservationService.asset(assetId);
  			var scheduleRef = $firebase(reservationsRef.child("schedules/"+assetId));
  			asset.$asObject().$loaded().then(function(data) {
  				ReservationService.cleanSchedule(scheduleRef, data.slot_size);
  			});

  			return scheduleRef;
  		},
  		cleanSchedule: function cleanSchedule(schedule, slotSize, wipeExisting) {
  			slotSize = slotSize || 60; //Defaults to one hour - In minutes
  			wipeExisting = wipeExisting || false;
  			var scheduleObject = schedule.$asObject();
  			var minutesInDay = 1440;
  			var numHours = minutesInDay/slotSize;

  			scheduleObject.$loaded().then(function(data) {
	  			for (var i = 0; i < 7; i++) { //Loop through days
	  				if(wipeExisting || angular.isUndefined(data[i]))
	  				{
	  					// console.log('Cleaning index:', i);
	  					var newObj = {};
	  					schedule.$remove(i); //Reset Day's slots

	  					var hourIndex = 0;
	  					for (var j = 0; j < numHours; j++) { //Loop through hours
	  						newObj[j] = true;
	  					}

	  					schedule.$set(i, newObj);
	  				}
	  			}
  			});
  			return true;
  		},
  		changeSlotSize: function changeSlotSize(groupId, assetId, slotSize) {
  			var scheduleRef = $firebase(reservationsRef.child("schedules/"+assetId));
	  		return ReservationService.cleanSchedule(scheduleRef, slotSize, true);
  		},
  		bookings: function getBookings(assetId, unit, custom_year, custom_week, custom_day) {
  			var year = custom_year || moment().get('year');
  			var week = custom_week || moment().get('week');
  			var day  = custom_day  || moment().dayOfYear();

  			switch (unit) {
  				case 'week': {
  					return $firebase(reservationsRef.child('bookings/'+assetId+'/'+year+'/'+week));
  				}
  				case 'day': {
  					return $firebase(reservationsRef.child('bookings/'+assetId+'/'+year+'/'+day));
  				}
  				default: {
  					var startDay = day;
  					var endDay = day + 6;
  					return $firebase(reservationsRef.child('bookings/'+assetId+'/'+year).startAt(null, startDay.toString()).limitToFirst(endDay));
  				}
  			}
  		},
  		book: function setBooking(assetId, dayOfYear, hour, custom_year) {
  			var year = custom_year || moment().get('year');
  			var bookingRef = $firebase(reservationsRef.child("bookings/"+assetId+'/'+year+'/'+dayOfYear));

  			return bookingRef.$set(hour, true);
  		},
  		compareAvailability: function compareAvailability(assets)
  		{
  			if(angular.isUndefined(assets))
  				return false;

  			//Debug
  			console.log("Asset Array", assets);

  			var assetRefs = [];
  			for (var i = 0; i < assets.length; i++) {
  				ReservationService.schedule(assets[i]).$asArray().$loaded(function(data) {
  					console.log('Array Loaded', data);
					var tempArray = [];

						//Loop through arrays and convert bool to int
	  				for (var k = 0; k < data.length; k++) {
	  					for (var j = 0; j < data[k].length; j++) {
	  						data[k][j] = data[k][j] ? 1 : 0;
	  					}
	  				}
	  				//Push the modified array to array of assets
	  				assetRefs.push(data);

	  				console.log('tempArray', data);
	  				if((assets.length) === i)
	  					doCompare();
  				});
  			}
  			//lls_402, -JfeEYTIi-8PSHVXOUgx
  			return function doCompare() {
  				//Do array math and return final array
				console.log('End');
				console.log('Final Arrays', assetRefs);
	  			if(angular.isDefined(assetRefs)) {
	  				var combinedArray = math.add(assetRefs[0], assetRefs[1]);
	  				return combinedArray;
	  			}
  			}
  		}
  	};

  	return ReservationService;

  });