'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:SoundcloudCtrl
 * @description
 * # SoundcloudCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('SoundcloudCtrl', function ($scope, $window, soundcloudfactory) {


      /*$scope.sctest = function() {
          $window.SC.connect().then(function(me){
              console.log(me.description);
          });
      };*/

      /*$scope.getSong = function() {
          $window.SC.get('/me').then(function(me) {
             $window.alert(me.username);
          });
      };*/

      /*$scope.putDescription = function() {

          $window.SC.put('/me', {
              user: { description: 'I am using the SoundCloud API!' }
          });
      };*/

      $scope.sctest = function() {
        soundcloudfactory.ScTest();
      };

      $scope.getUserName = function() {
        soundcloudfactory.getUserName();
      };

      $scope.getSong = function() {
        soundcloudfactory.getSong();
      };

      $scope.putDescription = function() {
        soundcloudfactory.putDescription();
      };

  });
