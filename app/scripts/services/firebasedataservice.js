'use strict';

/**
 * @ngdoc service
 * @name iprogApp.firebasedataservice
 * @description
 * # firebasedataservice
 * Service in the iprogApp.
 */
angular.module('iprogApp')
  .service('firebasedataservice', function (UserService) {

      var playlistRef = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
      var userRef = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

      this.logNewUser = function(authData, email) {
          userRef.child(authData.uid).set({
            name: email
          });
      }

      this.addSongToPlaylist = function(songId, songTitle, playlistId) {
          playlistRef.child(playlistId).child('songs').child(songId).set(songTitle);
      }

      this.populatePlaylist = function() {
          var listref = userRef.child(UserService.authData.uid).child('playlists');
          listref.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var tuple = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
            UserService.playlists.push(tuple);
          });
        });
      }



  });
