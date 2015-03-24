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
  .controller('DashboardCtrl', function ($rootScope, $scope, $stateParams, FirebaseGroupService, ReservationService, Notification) {
  	//Get the selected group from the route parameters and set it in the scope
    var groupId = $stateParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    //Check and see if the group exists in the Firebase, if not, add it.
    if(angular.isDefined(groupId) && groupId !== "")
      FirebaseGroupService.existsOrAdd(groupId);

    //Get Assets
    if(groupId)
      $scope.assets = ReservationService.groupAssets(groupId, 10).$asArray();
  });