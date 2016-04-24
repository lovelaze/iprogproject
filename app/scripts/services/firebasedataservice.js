'use strict';

/**
 * @ngdoc service
 * @name iprogApp.firebasedataservice
 * @description
 * # firebasedataservice
 * Service in the iprogApp.
 */
angular.module('iprogApp')
  .service('firebasedataservice', function () {

      var playlistRef = new Firebase('https://dazzling-heat-875.firebaseio.com/playlists');
      var userRef = new Firebase('https://dazzling-heat-875.firebaseio.com/users');

  });
