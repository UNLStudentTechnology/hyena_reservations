'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:ComparectrlCtrl
 * @description
 * # ComparectrlCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('CompareCtrl', function ($scope, ReservationService) {
    $scope.assets = "";
    $scope.compareOutput = null;

    $scope.compareAssets = function() {
      	var assets = $scope.assets.split(',');
        $scope.compareOutput = ReservationService.compareAvailability(assets);
        console.log("Output", $scope.compareOutput);
    };
  });
