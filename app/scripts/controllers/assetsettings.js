'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:AssetsettingsCtrl
 * @description
 * # AssetsettingsCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('AssetSettingsCtrl', function ($scope, $rootScope, $routeParams, ReservationService, Notification) {
    //Get and set the current group ID
  	var groupId = $routeParams.groupId;
  	$scope.groupId = $rootScope.currentGroupId = groupId;
  	//Get asset id
  	var assetId = $scope.assetId = $routeParams.assetId;

  	//Get Asset
  	var asset = ReservationService.asset(groupId, assetId).$asObject();
  	asset.$bindTo($scope, 'asset');
  });
