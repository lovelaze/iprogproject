'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('SearchCtrl', function ($scope, soundcloudfactory, $sce, UserService, firebasedataservice) {

      $scope.params = {'limit':200};
      $scope.accordionOpen = false;

      $scope.getPageList = function() {
          return UserService.pageList;
      };

      $scope.getPlaylists = function() {
          return UserService.playlists;
      };



      $scope.maxSize = 100;
      $scope.totalItems = UserService.downloadables.length;
      $scope.currentPage = 1;
      $scope.itemsPerPage = 5;
      $scope.songsPerPage = 5;

      var init = function() {
          UserService.playlists = [];
          UserService.downloadables = [];
          UserService.pageList = [];
          populatePlaylist();

      };
      // run more than once
      var populatePlaylist = function(){
          firebasedataservice.populatePlaylist();
      };

      $scope.addSongToPlaylist = function(song, playlistId) {
          firebasedataservice.addSongToPlaylist(song.id, song.title, playlistId);
      };

      $scope.songQuery = function() {
          //var params = {'term':$scope.searchInput,'genre':$scope.genreOption, 'minPlay':$scope.minPlayOption, 'maxPlay':$scope.maxPlayOption, 'minbpm':$scope.minBpmOption, 'maxbpm':$scope.maxBpmOption, 'limit':200};
          soundcloudfactory.search($scope.params).then(function(data) {
              UserService.downloadables = [];

              data.forEach(function(track) {
                  if (track.downloadable) {
                      UserService.downloadables.push(track);
                  }
              });

              $scope.totalItems = UserService.downloadables.length;

              if (UserService.downloadables.length === 0) {
                  UserService.pageList = [];
              } else {
                  updatePage(1);
              }

          });
          console.log($scope.params);
      };

      $scope.getframe = function(id) {
          return soundcloudfactory.createSongIframeFromId(id);
      };

      var updatePage = function(page) {
          $scope.currentPage = page;
          var begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
          var end = begin + $scope.itemsPerPage;
          if (UserService.downloadables.length - end < 0) {
              end = UserService.downloadables.length;
          }
          UserService.pageList = UserService.downloadables.slice(begin, end);
      };

      $scope.pageChange = function() {
          updatePage($scope.currentPage);
      };


      init();
  });
