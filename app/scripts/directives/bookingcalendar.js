/* global moment */
'use strict';

/**
 * @ngdoc directive
 * @name hyenaReservationsApp.directive:bookingCalendar
 * @description
 * # bookingCalendar
 */
angular.module('hyenaReservationsApp')
  .directive('bookingCalendar', function (ReservationService) {
    return {
      templateUrl: 'views/partials/booking-calendar.html',
      restrict: 'E',
      scope: {
      	asset: '=',
      	schedule: '=',
      	bookings: '=',
      	addBooking: '&onChange'
      },
      replace: false,
      link: function postLink(scope, element, attrs) {
      	/**
      	 * CHecks the current date and sets how many future days to show.
      	 */
      	function setDateVariables() {
      		scope.startDay = moment().dayOfYear();
      		scope.numDays = 5;
      		scope.endDay = scope.startDay + scope.numDays;
      	}

      	setDateVariables();
      	scope.moment = moment; //Make moment available to the template
      	setInterval(setDateVariables, 1800000); //Checks to see if the day has changed ever 30 minutes (in milliseconds)

      	/**
      	 * Waits for the asset to be defined then loads its data
      	 */
    		scope.$watch('asset', function(assetValue) {
    			if(angular.isDefined(assetValue)) {
    				scope.hide_before = moment(assetValue.hide_hour_before, 'hh:mm a').hour() || 0;
    				scope.hide_after = moment(assetValue.hide_hour_after, 'hh:mm a').hour() || 23;
    			}
    		});

      	/**
      	 * Pass through function for custom booking callback
      	 * @param  int day  Day of year
      	 * @param  int hour Hour of day
      	 */
      	scope.doBooking = function(day, hour) {
      		scope.addBooking()(day, hour);
      	};

       	/**
       	 * Provides a for loop for ng-repeat
       	 */
       	scope.range = function(min, max, step){
    			step = step || 1;
    			var input = [];
    			for (var i = min; i <= max; i += step) input.push(i);
    			return input;
    		};

    		/**
    		 * Converts the hour value stored on Firebase to minutes and returns a moment formated time
    		 * @param  int value Hour (0 to 23)
    		 * @return int       [description]
    		 */
    		scope.hourToMinutes = function(value) {
    			value = value*60;
    			return moment().startOf('day').minutes(value);
    		};
    		/**
    		 * Converts from minutes to hours
    		 * @param  int value [description]
    		 * @return int       Hour Value
    		 */
    		scope.minutesToHour = function(value) {
    			return value/60;
    		};

    		scope.convertKeyToNum = function(value) {
    			return (scope.asset.slot_size/60)*value;
    		};
      }
    };
  });