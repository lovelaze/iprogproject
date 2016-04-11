'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('HomeCtrl', function ($scope, $location, firebasefactory) {

    $scope.explore = function() {
        if($scope.testlogin() === true){
            $location.path("/search");
        }else{
            $location.path("/main");
        }
    };

    $scope.testlogin = function() {
        var authData = firebasefactory.$getAuth();
        if (authData) {
          return true;
        } else {
          return false;
        }
    };

  });
