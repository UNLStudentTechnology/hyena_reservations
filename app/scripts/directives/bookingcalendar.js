/* global moment */
'use strict';

/**
 * @ngdoc directive
 * @name hyenaReservationsApp.directive:bookingCalendar
 * @description
 * # bookingCalendar
 */
angular.module('hyenaReservationsApp')
  .directive('bookingCalendar', function () {
    return {
      templateUrl: 'views/partials/booking-calendar.html',
      restrict: 'E',
      scope: true,
      replace: false,
      link: function postLink(scope, element, attrs) {
      	scope.startDay = moment().dayOfYear();
      	scope.numDays = 5;
      	scope.endDay = scope.startDay + scope.numDays;
      	scope.moment = moment;

       	console.log('Current Date:', moment().format());

       	scope.range = function(min, max, step){
			step = step || 1;
			var input = [];
			for (var i = min; i <= max; i += step) input.push(i);
			return input;
		};

		scope.hourToMinutes = function(value) {
			value = value*60;
			return moment().startOf('day').minutes(value);
		};
      }
    };
  });