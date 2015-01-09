'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:AssetCtrl
 * @description
 * # AssetCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('AssetCtrl', function ($scope, $rootScope, $routeParams, ReservationService, Notification) {
  	//Get and set the current group ID
  	var groupId = $routeParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get asset id
  	var assetId = $routeParams.assetId;

  	//Get Asset
  	var asset = ReservationService.asset(groupId, assetId).$asObject();
  	asset.$bindTo($scope, 'asset');

  	//Get Schedule
  	var schedule = ReservationService.schedule(assetId).$asObject();
  	schedule.$bindTo($scope, 'schedule');
  	console.log('Schedule', schedule);

  	//Get Bookings
  	var bookings = ReservationService.bookings(assetId).$asObject();
  	bookings.$bindTo($scope, 'bookings');
  	console.log('Bookings', bookings);
  });
