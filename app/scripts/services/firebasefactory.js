'use strict';

/**
 * @ngdoc service
 * @name iprogApp.firebasefactory
 * @description
 * # firebasefactory
 * Factory in the iprogApp.
 */

angular.module('iprogApp')
  .factory('firebasefactory', function ($window, $firebaseAuth) {

    // Public API here
    return $firebaseAuth(new Firebase('https://dazzling-heat-875.firebaseio.com/'));


/*    return {
      test: function() {
          _ref.child('playlists').set({

              ax14293a9sdf9: {
                  song0: 'https://soundcloud.com/malibooze/bass',
                  song1: 'https://soundcloud.com/karenthesiren/hello'
              }

          });
      },
      test2: function() {
          _ref.child('playlists').once('value', function(data) {
              console.log(data.val());
          });
      }
    };
    */
  });
