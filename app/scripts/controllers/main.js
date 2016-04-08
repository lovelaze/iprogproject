'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('MainCtrl', function ($scope, $window, firebasefactory) {

      $scope.bajs = 'banankorv';

      firebasefactory.test2();

  });
