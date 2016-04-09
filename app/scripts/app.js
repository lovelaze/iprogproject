'use strict';

/**
 * @ngdoc overview
 * @name iprogApp
 * @description
 * # iprogApp
 *
 * Main module of the application.
 */
angular
  .module('iprogApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/soundcloud', {
        templateUrl: 'views/soundcloud.html',
        controller: 'SoundcloudCtrl',
        controllerAs: 'soundcloud'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
