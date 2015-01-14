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
      	scope.startDay = moment().dayOfYear();
      	scope.numDays = 5;
      	scope.endDay = scope.startDay + scope.numDays;
      	scope.moment = moment;

		scope.$watch('asset', function(newValue, oldValue) {
			if(angular.isDefined(newValue)) {
				scope.hide_before = moment(newValue.hide_hour_before, 'hh:mm a').hour();
				scope.hide_after = moment(newValue.hide_hour_after, 'hh:mm a').hour();
			}
		});

      	/**
      	 * Pass through function for custom booking callback
      	 * @param  int day  Day of year
      	 * @param  int hour Hour of day
      	 */
      	scope.doBooking = function(day, hour) {
      		scope.addBooking()(scope.asset.$id, day, hour);
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
		 * Converts the hour value stored on Firebase to minutes
		 * @param  int value Hour (0 to 23)
		 * @return int       [description]
		 */
		scope.hourToMinutes = function(value) {
			value = value*60;
			return moment().startOf('day').minutes(value);
		};

		scope.convertKeyToNum = function(value) {
			return (scope.asset.slot_size/60)*value;
		};
      }
    };
  });