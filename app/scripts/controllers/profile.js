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
  .controller('ProfileCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
