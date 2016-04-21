'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('HeaderCtrl', function ($scope, $location, UserService, firebasefactory) {

      UserService.authData = firebasefactory.$getAuth();
      $scope.getAuthData = function() {
          return UserService.authData;
      };

      if ($scope.getAuthData()){
          UserService.loggedIn = true;
      } else {
          UserService.loggedIn = false;
      }

      $scope.IsLoggedIn = function() {
          return UserService.loggedIn;
      };

      $scope.logout = function() {
          firebasefactory.$unauth();
          UserService.loggedIn = false;
          $location.path("/home");
      };

      $scope.loginreg = function() {
          $location.path("/main");
      };


  });
