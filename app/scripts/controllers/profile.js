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
  .controller('ProfileCtrl', function ($scope, UserService, soundcloudfactory) {

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
            console.log($scope.currentSongsList);
        });

    }

    $scope.accordionOnClick = function(id, open) {
        if (open) { //opening
            if ($scope.currentPlaylist != id) {
                $scope.currentPlaylist = id;
                getSongs(id);
            }
        } else { // closing
        }
    };

    var init = function() {
        $scope.getplaylistIds();
        refusers.child(UserService.authData.uid).child('playlists').limitToLast(1).on('child_added', function(childSnapshot, prevChildKey) {
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

      //$scope.getPlaylistSongs();
    };

    //get all the ids and name of the playlists of the logged in user (from firebase->users)
    $scope.getplaylistIds = function(){
      $scope.playlistIds = [];
      var userRef = refusers.child(UserService.authData.uid);
      var plUserRef = userRef.child('playlists');
      plUserRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var list_id = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
          $scope.playlistIds.push(list_id);
        });
      });
    };

    //stores every song into allPlaylists together with the id of its list
    $scope.getPlaylistSongs = function () {
      $scope.allPlaylists = [];
      $scope.getplaylistIds();
      var listid;
      ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          // childSnapshot -> playlist id level (e.g. -KG2rIEG0tNmnlL_An5z)
          listid = childSnapshot.key();
          childSnapshot.forEach(function(child2Snapshot){
            // child2Snapshot -> playlist field level (name, songs, user)
            if(child2Snapshot.key() == "songs"){
              child2Snapshot.forEach(function(child3Snapshot){
                // child3Snapshot -> song level (e.g. key=260510896: val=Land Of Thieves Demo)
                var song = {'id':child3Snapshot.key(), 'name':child3Snapshot.val(), 'listid': listid};
                $scope.allPlaylists.push(song);
              });
            }
          });
        });
      });

    };
    //------------------------ CALL THIS METHOD BELOW SOMEWHERE SO THAT IS HAPPEN MORE THAN ONCE ---------------------
    // ALSO PLAYLISTS AND MYINFO information DOES NOT SHOW UP UNTIL YOU PRESS A HEADER AT LEAST ONE TIME, NEEDS FIXING
    //----------------------------------------------------------------------------------------------------------------
    //$scope.getPlaylistSongs();

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
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          childSnapshot.forEach(function(childChildSnapshot) {
            childChildSnapshot.forEach(function() {
              // console.log("SONGSNAPSHOT VALUE: ", songSnapshot.val());
              num += 1;
            });
          });
        });
      });
      if (num > 0) {
        return num;
      } else {
        return NaN;
      }
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
  $scope.removePlaylist = function(id){
    //remove from firebase->users
    refusers.child(UserService.authData.uid).child("playlists").child(id).remove();

    //remove from firebase->playlists
    ref.child(id).remove();

    //$scope.getPlaylistSongs();
  };

  init();
});
