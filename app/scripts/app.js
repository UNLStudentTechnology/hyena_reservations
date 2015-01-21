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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'firebase',
    'angularMoment',
    'ui.mask'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'DashboardCtrl'
      })
      .when('/compare', {
        templateUrl: 'views/compare.html',
        controller: 'CompareCtrl'
      })
      .when('/:groupId', {
        templateUrl: 'views/main.html',
        controller: 'DashboardCtrl'
      })
      .when('/:groupId/asset/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .when('/:groupId/asset/:assetId/settings', {
        templateUrl: 'views/asset_settings.html',
        controller: 'AssetSettingsCtrl'
      })
      .when('/:groupId/asset/:assetId', {
        templateUrl: 'views/asset.html',
        controller: 'AssetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
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
  .constant('angularMomentConfig', {
    //timezone: 'America/Chicago'
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  });