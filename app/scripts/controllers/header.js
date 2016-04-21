'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('HeaderCtrl', function ($scope, UserService, firebasefactory) {

      $scope.authData = firebasefactory.$getAuth()
      if ($scope.authData){
          UserService.loggedIn = true;
          console.log($scope.authData);
      } else {
          UserService.loggedIn = false;
      }

      $scope.IsLoggedIn = function() {
          return UserService.loggedIn;
      };


  });
