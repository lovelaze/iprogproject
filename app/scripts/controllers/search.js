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

      $scope.downloadables = [];
      $scope.pageList = [];

      $scope.maxSize = 100;
      $scope.totalItems = 175;
      $scope.currentPage = 1;
      $scope.itemsPerPage = 5;

      $scope.searchLimit = 10;

      $scope.songs = [];
      $scope.filteredSongs = [];
      $scope.currentPage = 1;
      $scope.maxSize = 5;
      $scope.songsPerPage = 5;

      var ref = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');

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
          var params = {'term':$scope.searchInput,'genre':$scope.genreInput, 'minbpm':$scope.minbpm, 'maxbpm':$scope.maxbpm, 'limit':200};
          soundcloudfactory.search(params).then(function(data) {
              $scope.downloadables = [];

              data.forEach(function(track) {
                  if (track.downloadable) {
                      $scope.downloadables.push(track);
                  }
              });

              $scope.totalItems = $scope.downloadables.length;

              if ($scope.downloadables.length == 0) {
                  $scope.pageList = [];
              } else {
                  updatePage(1);
              }

          });
      };

      $scope.getframe = function(url) {
          return soundcloudfactory.createSongIframe(url);
      };

      var updatePage = function(page) {
          $scope.currentPage = page;
          var begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
          var end = begin + $scope.itemsPerPage;
          if ($scope.downloadables.length - end < 0) {
              end = $scope.downloadables.length;
          }
          $scope.pageList = $scope.downloadables.slice(begin, end);
      };

      $scope.pageChange = function() {
          updatePage($scope.currentPage);
      };








  });
