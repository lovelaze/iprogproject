'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('MainCtrl', function ($scope, $location, $window, firebaseauthfactory, UserService, firebasedataservice) {

      $scope.register = function() {
          firebaseauthfactory.$createUser({
              email: $scope.email,
              password: $scope.password
          }).then(function(authData) {
              console.log("Registered:", authData.uid);
              $window.alert("Registered");
              firebasedataservice.logNewUser(authData, $scope.email);
            }).catch(function(error) {
              console.error("Error: ", error);
              $window.alert(error);
            });
      };

    $scope.login = function() {
        firebaseauthfactory.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        }).then(function(authData) {
            UserService.loggedIn = true;
            UserService.authData = authData;
          console.log("Logged in as:", authData.uid);
          $location.path("/search");
          //$window.alert("Logged in!");

        }).catch(function(error) {
          console.error("Authentication failed:", error);
          $window.alert("Authentication failed");
        });
    };



  });
