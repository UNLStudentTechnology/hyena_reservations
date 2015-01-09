'use strict';

/**
 * @ngdoc filter
 * @name hyenaReservationsApp.filter:user
 * @function
 * @description
 * # user
 * Filter in the hyenaReservationsApp.
 */
angular.module('hyenaReservationsApp')
  .filter('user', function (UserService) {
    var userFilter = function (input) {
    	var user = UserService.getUserRelations(input);
    	return input;
    };
    userFilter.$stateful = true;
    return userFilter;
  });
