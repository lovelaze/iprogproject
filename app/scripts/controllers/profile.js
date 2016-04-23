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
  .controller('ProfileCtrl', function ($scope, UserService, soundcloudfactory, firebasefactory) {

    var ref = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
    var refusers = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

    $scope.playlistIds = [];
    $scope.allPlaylists = [];

    $scope.addPlaylistToFirebase = function() {
      //maybe use firebase array for this shit
      var listname = $scope.newPlaylist;

      console.log(UserService.authData.password.email);
      var username = UserService.authData.password.email;
      //pushing to add specific if to each playlist
      var id = ref.push({
        name: listname,
        user: username
      });
      console.log(id.key());
      var pushid = id.key();

      //add to firebase->users
      var userRef = refusers.child(UserService.authData.uid);
      var plUserRef = userRef.child('playlists');
      plUserRef.child(pushid).set(listname);

    };

    $scope.getplaylistIds = function(){
      var userRef = refusers.child(UserService.authData.uid);
      var plUserRef = userRef.child('playlists');
      plUserRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var listid = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
          $scope.playlistIds.push(listid);
        });
      });
    };
    $scope.getplaylistIds();

    $scope.getPlaylistSongs = function (id) {
        var songs = ref.child(id).child("songs");
        songs.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var song = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
            $scope.allPlaylists.push(song);
            console.log(song);
          });
        });
    };
    $scope.getPlaylistSongs("260510896");

    /*
    // run more than once
    $scope.populatePlaylists = function(){
      //update ids for all playlists of the logged in user
      $scope.getplaylistIds();

      for(idinstance in $scope.playlistIds){
        var songs = ref.child(idinstance.id).child("songs");
        songs.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var tuple = {'songid':childSnapshot.key(), 'name':childSnapshot.val()};
            $scope.allPlaylists.push(tuple);
          });
        });
      }
    };
    $scope.populatePlaylists();*/

    //test method for adding firebase data to scope variable
    $scope.getPlaylist = function() {
      var lists = ref.child("playlists");
      //$scope.allPlaylists = lists.val();
      //console.log(lists);
      /*
      ref.once("value", function(snapshot){
        //each playlist
        snapshot.forEach(function(childSnapshot){
          //get data inside each playlist
          var childdata = childSnapshot.val();
          //var userN = childdata.user;
          console.log(childdata);
        });
      });*/
    };
    //$scope.getPlaylist();

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

    $scope.showContent = function(function_nr) {
		document.getElementById('profinfo').style.display = "none";
		document.getElementById('friends').style.display = "none";
		document.getElementById('playlists').style.display = "none";
		switch (function_nr) {
		    case 0:
		        document.getElementById('profinfo').style.display = "block";
		        break;
		    case 1:
		        document.getElementById('friends').style.display = "block";
		        break;
		    case 2:
		        document.getElementById('playlists').style.display = "block";
		        break;
		}
	};

	$scope.addPlaylist = function(){
		var listname = $scope.newPlaylist;
		//add playlist name (empty) to firebase
		var div = '<div><h2 align="left" style="font-weight: bold;">' + listname + '</h2></div><hr style="width: 100%; color: grey; height: 1px; background-color:grey;" />';
		angular.element(document.querySelector('#playlists')).append(div);
	};

	$scope.testShowIframes = function(songnr){
		var bool = true;
		if(document.getElementById(songnr).style.display === "block"){
			bool = false;
		}
		document.getElementById('song1').style.display = "none";
		document.getElementById('song2').style.display = "none";
		document.getElementById('song3').style.display = "none";
		document.getElementById('song4').style.display = "none";

		if(bool){
			document.getElementById(songnr).style.display = "block";
		}
	};
  });
