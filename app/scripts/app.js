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

    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search',
        resolve: {
        "currentAuth": ["firebasefactory", function(firebasefactory) {
          return firebasefactory.$requireAuth();
        }]
        }
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        resolve: {
        "currentAuth": ["firebasefactory", function(firebasefactory) {
          return firebasefactory.$requireAuth();
        }]
        }
    })/*
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
    })*/
      .otherwise({
        redirectTo: '/'
      });
  }).run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/");
      }
    });
}]);
