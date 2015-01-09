'use strict';

/**
 * @ngdoc function
 * @name hyenaReservationsApp.controller:AppctrlCtrl
 * @description
 * # AppctrlCtrl
 * Controller of the hyenaReservationsApp
 */
angular.module('hyenaReservationsApp')
  .controller('AppCtrl', function ($scope, $routeParams, AppService, Notification, PLATFORM_ROOT) {

    //Get the requested app by ID
    var appId = parseInt($routeParams.appId);
    AppService.get(appId).then(function(response) {
      $scope.app = response.data;
    });

    //Set upload target
    $scope.uploadTarget = PLATFORM_ROOT+'apps/'+appId+'/image';

    $scope.$watch('app', function(newValue, oldValue) {
    	if(angular.isDefined(oldValue) && newValue !== null && newValue !== oldValue)
    	{
    		$scope.updateApp();
    	}
    }, true);

    /**
     * Watches ng-file-upload to see if the user is attempting to upload a file.
     */
    $scope.$watch('app_icon_file', function(app_icon) {
      if(angular.isDefined(app_icon))
      {
        console.log(app_icon[0]);
        var icon_upload = AppService.uploadImage(appId, app_icon[0]);
        icon_upload.progress(function(evt) {
          console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
        }).success(function(data, status, headers, config) {
          $scope.app.icon_url = data.uploaded_file;
          //Find the local app, update it.
          for (var i = 0; i < $scope.currentUser.apps.length; i++) {
            if($scope.currentUser.apps[i].id === appId)
            {
              $scope.currentUser.apps[i].icon_url = data.uploaded_file;
              break;
            }
          }
        }).error(function(data, status, headers, config) {
          Notification.show('Sorry! There was an error uploading that image.', 'error');
          console.log('Icon upload failed:', data);
        });
      }
    });

    /**
     * Updates remote data for app
     */
    $scope.updateApp = function() {
    	AppService.update(appId, $scope.app).then(function(response) {
    		for (var i = 0; i < $scope.currentUser.apps.length; i++) {
    			if($scope.currentUser.apps[i].id === appId)
    			{
    				$scope.currentUser.apps[i] = $scope.app;
    				break;
    			}
    		}
    	}, function(error) {
    		Notification.show('Sorry! There was an error updating your app.', 'error');
    	});
    };

    /**
     * Removes the app from the database
     */
    $scope.removeApp = function() {
      AppService.remove(appId).then(function(response) {
        //Find the local app, remove it.
        for (var i = 0; i < $scope.currentUser.apps.length; i++) {
          if($scope.currentUser.apps[i].id === appId)
          {
            //Remove element
            $scope.currentUser.apps.splice(i, 1);
            break;
          }
        }

        //Navigate back to the app listing
        $scope.go('/', 'animate-slide-left');
        Notification.show('Your app has been removed.', 'success');
      }, function(error) {
        console.log('Error removing app', error);
        Notification.show('Sorry! There was an error removing your app.', 'error');
      });
    };

  });
