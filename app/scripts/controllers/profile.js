// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('ProfileCtrl', function ($scope, UserService, soundcloudfactory, $q, firebasedataservice) {

    $scope.showInfo = true;
    $scope.showPlaylists = false;
    $scope.oldpass;
    $scope.newpass;

    $scope.getPlaylistIds = function() {
        return UserService.playlistIds;
    };

    $scope.getAllPlaylists = function() {
        return UserService.allPlaylists;
    };

    $scope.getCurrentSongsList = function() {
        return UserService.currentSongsList;
    };

    var getSongs = function(id) {
        firebasedataservice.getSongs(id);
    };

    $scope.accordionOnClick = function(id, open) {
        if (open) { //opening
            if ($scope.currentPlaylist !== id) {
                $scope.currentPlaylist = id;
                getSongs(id);
            }
        } else { // closing
        }
    };

    var init = function() {
        firebasedataservice.getPlaylistIds().then(function(data) {
            UserService.playlistIds = data;
        });
    };

    //called when addplaylist button is pressed
    $scope.addPlaylistToFirebase = function() {
      //maybe use firebase array for this shit
      var listname = $scope.newPlaylist;
      var username = UserService.authData.password.email;
      firebasedataservice.addPlaylist(listname, username);

    };

    $scope.removeSong = function(listId, songId, songIndex) {
        firebasedataservice.removeSong(listId, songId, songIndex);
    };

    $scope.getUsername = function() {
        return UserService.authData;
    };
    /*
    $scope.getPlaylistCount = function() {
        var num = 0;
        ref.on("value", function(snapshot) {
            num = snapshot.numChildren();
        });
        if (num > 0) {
            return num;
        } else {
            return NaN;
        }
    };
    */

    $scope.getframe = function(id) {
        return soundcloudfactory.createSongIframeFromId(id);
    };

    /*
    $scope.getSongsCount = function() {
        var num = 0;
        ref.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(childChildSnapshot) {
              if (childChildSnapshot.val() == UserService.authData.password.email) {
                  //console.log(childChildSnapshot.val());
                  var userSnap = childSnapshot;
                  userSnap.forEach(function(finalSnap) {
                      finalSnap.forEach(function(songs) {
                          num += 1;
                      });
                  });
              }
            });
          });
          return num;
        });
    };
    */

    //setting scope bool variables that decides if divs are showing or not, depending on which "header" you click
    $scope.showContent = function(function_nr) {
      $scope.showInfo = false;
      $scope.showPlaylists = false;
  		switch (function_nr) {
  		    case 0:
  		      $scope.showInfo = true;
  		      break;
  		    case 1:
  		      $scope.showPlaylists = true;
  		      break;
  		}
	};

  //removes playlist, from both "users" and "playlists" in firebase
  $scope.removePlaylist = function(id, index){
      firebasedataservice.removePlaylist(id, index);
  };

  $scope.changePassword = function() {
    if($scope.oldpass == NULL || $scope.newpass == NULL || $scope.newpass == ""){
      return;
    } else {

    }
  };

  init();
});
