/* global moment */
'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:MainCtrl
 * @description
 * # DashboardCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('DashboardCtrl', function ($rootScope, $scope, $routeParams, GroupService, ReservationService, Notification) {
  	//Get the selected group from the route parameters and set it in the scope
    var groupId = $routeParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Check and see if the group exists in the Firebase, if not, add it.
    if(angular.isDefined(groupId))
      GroupService.existsOrAdd(groupId);

  	//Get Assets
  	$scope.assets = ReservationService.assets(groupId, 10).$asArray();
  });