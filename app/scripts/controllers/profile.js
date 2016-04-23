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
  .controller('ProfileCtrl', function ($scope, UserService) {

    var ref = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
    var refusers = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

    $scope.addPlaylistToFirebase = function() {
      //maybe use firebase array for this shit
      var listname = $scope.newPlaylist;

      console.log(UserService.authData.password.email);
      var username = UserService.authData.password.email;
      //pushing to add specific if to each playlist
      var id = ref.push({
        name: listname,
        user: username,
        songs: {song: "https://w.soundcloud.com/player/?visual=false&url=https://api.soundcloud.com/tracks/53437625&show_artwork=true&auto_play=false"}
      });
      console.log(id.key());
      var pushid = id.key();

      //add to firebase->users
      var userRef = refusers.child(UserService.authData.uid);
      var plUserRef = userRef.child('playlists');
      plUserRef.push(pushid);


      console.log("Added playlist:", listname);
      console.log($scope.listObjects);
    };

    //test method for adding firebase data to scope variable
    $scope.getPlaylist = function() {
      ref.once("value", function(snapshot){
        //each playlist
        snapshot.forEach(function(childSnapshot){
          //get data inside each playlist
          var childdata = childSnapshot.val();
          //var userN = childdata.user;
          console.log(childdata);
        });
      });
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
