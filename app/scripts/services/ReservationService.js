/* global moment */
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
  			return $firebase(reservationsRef.child('groups/'+groupId+"/assets").limit(limit));
  		},
  		asset: function getAsset(groupId, assetId) {
  			return $firebase(reservationsRef.child('groups/'+groupId+"/assets/"+assetId));
  		},
  		schedule: function getSchedule(groupId, assetId) {
  			var asset = ReservationService.asset(groupId, assetId);
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
	  					schedule.$set(i, newObj); //Reset Day's slots

	  					var hourIndex = 0;
	  					for (var j = 0; j < numHours; j++) { //Loop through hours
	  						newObj[j] = false;
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
  					return $firebase(reservationsRef.child('bookings/'+assetId+'/'+year).startAt(null, startDay.toString()).limit(endDay));
  				}
  			}
  		},
  		book: function setBooking(assetId, dayOfYear, hour, custom_year) {
  			var year = custom_year || moment().get('year');
  			var bookingRef = $firebase(reservationsRef.child("bookings/"+assetId+'/'+year+'/'+dayOfYear));

  			return bookingRef.$set(hour, true);
  		}
  	};

  	return ReservationService;

  });