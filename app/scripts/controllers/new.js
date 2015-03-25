'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:NewappCtrl
 * @description
 * # NewappCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('NewCtrl', function ($scope, $stateParams, $rootScope, Notification, ReservationService) {
  	//Get the selected group from the route parameters and set it in the scope
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Default asset settings
    $scope.asset = {
        group_id: groupId,
    	slot_size: 60,
    	max_booking_length: 60,
    	units: 1
    };

    /**
     * Creates a new asset on the Firebase
     */
    $scope.createAsset = function() {
    	ReservationService.add($scope.asset, groupId).then(function(response) {
    		console.log(response);
    		var assetId = response.key();
    		//Redirect and notify
    		$scope.go('/'+groupId+'/asset/'+assetId);
    		Notification.show('Your asset has been created successfully!', 'success');
    	}, function(error) {
    		console.log('Create Asset Error', error);
    		Notification.show('There was an error creating your asset.', 'error');
    	});
    };
  });
