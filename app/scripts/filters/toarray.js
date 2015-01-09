'use strict';

/**
 * @ngdoc filter
 * @name hyenaReservationsApp.filter:toArray
 * @function
 * @description
 * # toArray
 * Filter in the hyenaReservationsApp.
 */
angular.module('hyenaReservationsApp')
  .filter('toArray', function () {
    return function (obj) {
      	if (!(obj instanceof Object)) {
            return obj;
        }
        return Object.keys(obj).map(function (key) {
	        return Object.defineProperty(obj[key], '$key', { enumerable: false, value: key});
	      });
    };
  });
