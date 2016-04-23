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
    $scope.allPlaylists2 = [];

    $scope.info1list = [];
    $scope.info2list = [];
    /*var info = {'id':"260510896", 'name':"dance"};
    var info1second = {'id':"260510896", 'name':"danceversion2"};
    var info2 = {'id':"260510896", 'name':"dance"};
    $scope.info1list.push(info);
    $scope.info1list.push(info1second);
    var intodfdf = $scope.info1list;
    $scope.info2list.push(info2);
    var intodfdf2 = $scope.info2list;
    $scope.allPlaylists2.push(intodfdf);
    $scope.allPlaylists2.push(intodfdf2);*/

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
      console.log(id.key());
      var pushid = id.key();

      //add to firebase->users
      var userRef = refusers.child(UserService.authData.uid);
      var plUserRef = userRef.child('playlists');
      plUserRef.child(pushid).set(listname);
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
          var string = childSnapshot.key();
          console.log(string);
        });
      });
    };

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
                console.log(child3Snapshot.key() + " " + child3Snapshot.val() + " " + listid);
                $scope.allPlaylists.push(song);
              });
            }
          });
        });
      });
    };
    $scope.getPlaylistSongs();

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
