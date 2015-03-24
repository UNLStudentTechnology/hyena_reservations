'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:AssetsettingsCtrl
 * @description
 * # AssetsettingsCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('AssetSettingsCtrl', function ($scope, $rootScope, $stateParams, ReservationService, Notification) {
    //Get and set the current group ID
  	var groupId = $stateParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get asset id
  	var assetId = $scope.assetId = $stateParams.assetId;

  	//Get Asset
  	var asset = ReservationService.asset(assetId).$asObject();
  	asset.$bindTo($scope, 'asset');

    $scope.$watch('asset.slot_size', function(newValue, oldValue) {
      if(angular.isDefined(oldValue))
      {
        ReservationService.changeSlotSize(assetId, newValue);
      }
    });

    /**
     * Removes the asset from the database
     */
    $scope.removeAsset = function() {
      ReservationService.remove(assetId).then(function(response) {
        //Navigate back to the asset listing
        $scope.go('/'+groupId, 'animate-slide-left');
        Notification.show('Your asset has been successfully removed.', 'success');
      }, function(error) {
        console.log('Error removing asset', error);
        Notification.show('Sorry! There was an error removing your asset.', 'error');
      });
    };
  });
