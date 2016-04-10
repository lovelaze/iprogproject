'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('SearchCtrl', function ($scope, soundcloudfactory, $sce) {

      $scope.searchLimit = 10;


      $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
      };


      $scope.songQuery = function() {
          var params = {'term':$scope.searchInput,'genre':$scope.genreInput, 'minbpm':$scope.minbpm, 'maxbpm':$scope.maxbpm, 'limit':30};
          soundcloudfactory.search(params).then(function(data) {
              $scope.testdata = data;
              console.log(data);
          });
      };

      $scope.getframe = function(url) {
          return soundcloudfactory.createSongIframe(url);
      };








  });
