'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:NewappCtrl
 * @description
 * # NewappCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('NewCtrl', function ($scope, $routeParams, $rootScope, Notification) {
  	//Get the selected group from the route parameters and set it in the scope
    var groupId = $routeParams.groupId;
    $scope.groupId = $rootScope.currentGroupId = groupId;

    $scope.asset = {};
  });
