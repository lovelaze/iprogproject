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
<<<<<<< HEAD
    return $firebaseAuth(new Firebase('https://dazzling-heat-875.firebaseio.com/'));
=======
    return {
      someMethod: function () {
        return 42;
    },
      addItem: function(item) {
          _ref.push(item);
      },
      removeAll: function() {
          _ref.remove();
      },
      getItem: function() {
          console.log($firebaseObject(_ref));
      },
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
>>>>>>> 0571aff8b4d4b39e06b8d02723115b906fdd0b8f
  });
