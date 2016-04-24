// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

'use strict';

/**
 * @ngdoc service
 * @name iprogApp.firebasedataservice
 * @description
 * # firebasedataservice
 * Service in the iprogApp.
 */
angular.module('iprogApp')
  .service('firebasedataservice', function (UserService, $q) {

      var playlistRef = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
      var userRef = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

      this.logNewUser = function(authData, email) {
          userRef.child(authData.uid).set({
            name: email
          });
      };

      this.addSongToPlaylist = function(songId, songTitle, playlistId) {
          playlistRef.child(playlistId).child('songs').child(songId).set(songTitle);
      };

      this.addPlaylist = function(listname, email) {
          var id = playlistRef.push({
            name: listname,
            user: email
          });
          var pushid = id.key();

          var plUserRef = userRef.child(UserService.authData.uid).child('playlists');
          plUserRef.child(pushid).set(listname);

          UserService.playlistIds.push({'id':pushid, 'name':listname});
      };

      this.removeSong = function(listId, songId, songIndex) {
          playlistRef.child(listId).child('songs').child(songId).remove();
          if (songIndex > -1) {
              UserService.currentSongsList.splice(songIndex, 1);
          }
      };

      this.getPlaylistIds = function() {
          var tmplist = [];
          var deferred = $q.defer();

          var plUserRef = userRef.child(UserService.authData.uid).child('playlists');
          plUserRef.once("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var list_id = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
                  tmplist.push(list_id);
              });
              deferred.resolve(tmplist);
          });

          return deferred.promise;
      };

      this.removePlaylist = function(id, index) {
          userRef.child(UserService.authData.uid).child("playlists").child(id).remove();
          //remove from firebase->playlists
          playlistRef.child(id).remove();

          if (index > -1) {
              UserService.playlistIds.splice(index, 1);
          }
      };


      this.getSongs = function(id) {
          UserService.currentSongsList = [];

          playlistRef.child(id).child('songs').once('value', function(snapshot) {
              snapshot.forEach(function(songSnapshot) {
                  var song = {'id':songSnapshot.key(), name:songSnapshot.val()};
                  UserService.currentSongsList.push(song);
              });
          });
      };




      this.populatePlaylist = function() {
          var listref = userRef.child(UserService.authData.uid).child('playlists');
          listref.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var tuple = {'id':childSnapshot.key(), 'name':childSnapshot.val()};
            UserService.playlists.push(tuple);
          });
        });
    };



  });
