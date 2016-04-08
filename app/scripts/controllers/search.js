'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('SearchCtrl', function ($scope, $window, soundcloudfactory) {

      $scope.testdata = soundcloudfactory.search();

      console.log($scope.testdata);





  });
