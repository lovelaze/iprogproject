'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('SearchCtrl', function ($scope, soundcloudfactory, $sce, UserService) {

      $scope.downloadables = [];
      $scope.pageList = [];
      $scope.playlists = [];

      $scope.maxSize = 100;
      $scope.totalItems = 175;
      $scope.currentPage = 1;
      $scope.itemsPerPage = 5;
      $scope.songsPerPage = 5;

      $scope.searchLimit = 10;

      $scope.mstep = 1;
      $scope.sstep = 1;



      var refP = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
      var refU = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

      $scope.createNewPlaylist = function(name){
          $scope.populatePlaylist();
      };

      // run more than once
      $scope.populatePlaylist = function(){
          var userRef = refU.child(UserService.authData.uid);
          var plUserRef = userRef.child('playlists');
          plUserRef.once("value", function(snapshot) {

          snapshot.forEach(function(childSnapshot) {
            var tuple = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
            $scope.playlists.push(tuple);
          });
        });
      };

      $scope.populatePlaylist();


      $scope.addSongToPlaylist = function(song, playlistId) {
          var listRef = refP.child(playlistId).child('songs');
          listRef.child(song.id).set(song.title);

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

              if ($scope.downloadables.length === 0) {
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
