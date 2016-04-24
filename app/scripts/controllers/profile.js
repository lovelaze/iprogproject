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
  .controller('ProfileCtrl', function ($scope, UserService, soundcloudfactory, $q) {

    var ref = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
    var refusers = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

    $scope.playlistIds = [];
    $scope.allPlaylists = [];

    $scope.currentSongsList = [];

    $scope.showValueOne = true;
    $scope.showValueTwo = false;
    $scope.showValueThree = false;

    var getSongs = function(id) {
        $scope.currentSongsList = [];

        ref.child(id).child('songs').once('value', function(snapshot) {
            snapshot.forEach(function(songSnapshot) {
                var song = {'id':songSnapshot.key(), name:songSnapshot.val()};
                $scope.currentSongsList.push(song);
            });
        });

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
        $scope.getplaylistIds().then(function(data) {
            $scope.playlistIds = data;
        });
        refusers.child(UserService.authData.uid).child('playlists').on('child_added', function(childSnapshot, prevChildKey) {
            console.log('playlist added');
            console.log(childSnapshot.val());
        });

        refusers.child(UserService.authData.uid).child('playlists').on('child_removed', function(childSnapshot) {
            console.log('playlist removed');
        });
    };

    //called when addplaylist button is pressed
    $scope.addPlaylistToFirebase = function() {
      //maybe use firebase array for this shit
      var listname = $scope.newPlaylist;
      var username = UserService.authData.password.email;
      //pushing to add specific if to each playlist
      var id = ref.push({
        name: listname,
        user: username
      });
      var pushid = id.key();

      //add to firebase->users
      var userRef = refusers.child(UserService.authData.uid);
      var plUserRef = userRef.child('playlists');
      plUserRef.child(pushid).set(listname);
      $scope.playlistIds.push({'id':pushid, 'name':listname});

    };

    $scope.removeSong = function(listId, songId, songIndex) {

        ref.child(listId).child('songs').child(songId).remove();
        if (songIndex > -1) {
            $scope.currentSongsList.splice(songIndex, 1);
        }


    };

    //get all the ids and name of the playlists of the logged in user (from firebase->users)
    $scope.getplaylistIds = function(){

        var tmplist = [];
        var deferred = $q.defer();

        var userRef = refusers.child(UserService.authData.uid);
        var plUserRef = userRef.child('playlists');
        plUserRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var list_id = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
                tmplist.push(list_id);
            });
            deferred.resolve(tmplist);
        });

        return deferred.promise;

    };


    $scope.getUsername = function() {
        return UserService.authData;
    };

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

    $scope.getframe = function(id) {
        return soundcloudfactory.createSongIframeFromId(id);
    };

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
                          console.log("num = ", num);
                      });
                  });
              }
            });
          });
          console.log("final num = ", num);
          return num;
        });
    };

    //setting scope bool variables that decides if divs are showing or not, depending on which "header" you click
    $scope.showContent = function(function_nr) {
      $scope.showValueOne = false;
      $scope.showValueTwo = false;
      $scope.showValueThree = false;
  		switch (function_nr) {
  		    case 0:
  		      $scope.showValueOne = true;
  		      break;
  		    case 1:
  		      $scope.showValueTwo = true;
  		      break;
  		    case 2:
  		      $scope.showValueThree = true;
  		      break;
  		}
	};

  //removes playlist, from both "users" and "playlists" in firebase
  $scope.removePlaylist = function(id, index){
    //remove from firebase->users
    refusers.child(UserService.authData.uid).child("playlists").child(id).remove();
    //remove from firebase->playlists
    ref.child(id).remove();

    if (index > -1) {
        $scope.playlistIds.splice(index, 1);
    }
  };

  init();
});
