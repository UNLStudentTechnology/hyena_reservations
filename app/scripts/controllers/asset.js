'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:AssetCtrl
 * @description
 * # AssetCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('AssetCtrl', function ($scope, $rootScope, $stateParams, ReservationService, Notification) {
  	//Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get asset id
  	var assetId = $scope.assetId = $stateParams.assetId;

  	//Get Asset
  	var asset = ReservationService.asset(assetId).$asObject();
  	asset.$bindTo($scope, 'asset');

  	//Get Schedule
  	var schedule = ReservationService.schedule(assetId).$asObject();
  	schedule.$bindTo($scope, 'schedule');

  	//Get Bookings
  	var bookings = ReservationService.bookings(assetId).$asObject();
  	bookings.$bindTo($scope, 'bookings');

  	$scope.addBooking = function(day, hour) {
   		console.log('Adding Booking', day, hour, assetId);
   		var bookingResponse = ReservationService.book(assetId, day, hour);
   		bookingResponse.then(function(response) {
   			Notification.show('That time has been booked successfully!', 'success');
   		});
   	};

  });
