'use strict';

/**
 * @ngdoc overview
 * @name hyenaReservationsApp
 * @description
 * # hyenaReservationsApp
 *
 * Main module of the application.
 */
angular
  .module('hyenaReservationsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'hyenaAngular',
    'ui.mask'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      //Layouts
      .state('unl-layout', {
        templateUrl: 'views/layouts/unl-layout.html',
        data: {
          requireAuth: true
        }
      })
      .state('unl-layout-kiosk', {
        templateUrl: 'views/layouts/unl-layout-kiosk.html',
        data: {
          requireAuth: false
        }
      })
      //Views
      .state('unl-layout.compare', {
        url: '/compare',
        templateUrl: 'views/compare.html',
        controller: 'CompareCtrl'
      })
      .state('unl-layout.main', {
        url: '/:groupId',
        templateUrl: 'views/main.html',
        controller: 'DashboardCtrl'
      })
      .state('unl-layout.new', {
        url: '/:groupId/asset/new',
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .state('unl-layout.asset', {
        url: '/:groupId/asset/:assetId',
        templateUrl: 'views/asset.html',
        controller: 'AssetCtrl'
      })
      .state('unl-layout.asset_settings', {
        url: '/:groupId/asset/:assetId/settings',
        templateUrl: 'views/asset_settings.html',
        controller: 'AssetSettingsCtrl'
      });
      
      //Default Route
      $urlRouterProvider.otherwise("/");
      //End Default Route
      
      //Remove # from URLs
      $locationProvider.html5Mode(true);
  })
  .config(function ($httpProvider) {
    //$httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .constant('FBURL', 'https://hyena-reservations.firebaseio.com/')
  .constant('APIKEY', 'MTAxMDI2YWJhN2NhZDk0MWE3Mzg1YjA5')
  .constant('APIPATH', 'http://st-studio.unl.edu/hyena_platform/public/api/1.0/')
  .constant('PLATFORM_ROOT', 'http://st-studio.unl.edu/hyena_platform/public/')
  .constant('AUTH_SCOPE', 'groups');