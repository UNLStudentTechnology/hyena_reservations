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
  		schedule: function getSchedule(assetId) {
  			var scheduleRef = $firebase(reservationsRef.child("schedules/"+assetId));
  			ReservationService.cleanSchedule(scheduleRef);
  			return scheduleRef;
  		},
  		cleanSchedule: function cleanSchedule(schedule) {
  			var scheduleObject = schedule.$asObject();
  			scheduleObject.$loaded().then(function(data) {
	  			for (var i = 0; i < 7; i++) {
	  				if(angular.isUndefined(data[i]))
	  				{
	  					console.log('Cleaning index:', i);
	  					var newObj = {};
	  					for (var j = 0; j < 24; j++) {
	  						newObj[j] = false;
	  					}

	  					schedule.$set(i, newObj);
	  				}
	  			}
  			});
  			return true;
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
