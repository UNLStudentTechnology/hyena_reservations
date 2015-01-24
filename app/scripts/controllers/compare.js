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
    $scope.assets = ReservationService.groupAssets(1, 10).$asArray();
    $scope.asset_list = "";
    $scope.schedule = null;

    //Asset display settings
    $scope.asset = {
    	hide_hour_after: "0600pm",
    	hide_hour_before: "0800am",
    	slot_size: 60
    };

    $scope.addAsset = function(value) {
      $scope.asset_list += value + " ";
      $scope.compareAssets();
    };

    $scope.compareAssets = function() {
      	var assets = $scope.asset_list.trim().split(' ');
      	var start = new Date().getTime();

        //Get the assets needed for the copmarison
        ReservationService.assets(assets).then(function(promises) {
          //Run the comparison
          $scope.schedule = ReservationService.compareAvailability(promises, $scope.asset.slot_size);

          //Measure Performance
          var end = new Date().getTime();
          var time = end - start;
          console.log('Comparison execution time:', time + "ms");
        });
    };
  });
