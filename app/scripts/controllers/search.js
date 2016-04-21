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

      $scope.songs = [];
      $scope.filteredSongs = [];
      $scope.currentPage = 1;
      $scope.maxSize = 5;
      $scope.songsPerPage = 5;

      var ref = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');

      $scope.testPaging = function() {
          soundcloudfactory.testPaging().then(function(data) {
              console.log(data);
          });
      };

      $scope.addSongToPlaylist = function(url) {
          var playlistRef = ref.child("playlist1");
          // var newPlaylistRef = playlistRef.push();

          // Convert track uri to an iframe link for that track
          var track = soundcloudfactory.createSongIframe(url);

          console.log("fetched track is", track);
          playlistRef.set({
              track1: track,
          });

          console.log("Adding to song1 in playlist1!");
      };

      $scope.createPages = function(){
        $scope.songs = [];
        for (var i=1;i<=1000;i++) {
          $scope.songs.push({ text:"song "+i, done:false});
        }
      };
      $scope.createPages();

      $scope.$watch("currentPage + songsPerPage", function() {
        var begin = (($scope.currentPage - 1) * $scope.songsPerPage);
        var end = begin + $scope.songsPerPage;
        $scope.filteredSongs = $scope.songs.slice(begin, end);
      });

      $scope.numPages = function () {
          return Math.ceil($scope.songs.length / $scope.songsPerPage);
      };



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
