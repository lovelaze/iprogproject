'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('MainCtrl', function ($scope, $location, $window, firebasefactory, UserService) {
      var ref = new Firebase('https://dazzling-heat-875.firebaseio.com/');

      $scope.bajs = 'banankorv';

      $scope.testreg = function() {
          firebasefactory.$createUser({
              email: $scope.email,
              password: $scope.password
          }).then(function(authData) {
              console.log("Registered:", authData.uid);
              $window.alert("Registered");
              ref.child("users").child(authData.uid).set({
                name: $scope.email
              });
            }).catch(function(error) {
              console.error("Error: ", error);
              $window.alert(error);
            });
      };

    $scope.testlogin = function() {
        firebasefactory.$authWithPassword({
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





    $scope.testinfo = function() {
        var authData = firebasefactory.$getAuth();
        if (authData) {
          console.log("User " + authData.uid + ", " + authData.password.email + ", is logged in with " + authData.provider);
        } else {
          console.log("User is logged out");
        }
    };




  });
