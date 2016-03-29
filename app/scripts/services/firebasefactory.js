'use strict';

/**
 * @ngdoc service
 * @name iprogApp.firebasefactory
 * @description
 * # firebasefactory
 * Factory in the iprogApp.
 */
angular.module('iprogApp')
  .factory('firebasefactory', function ($window, $firebaseObject) {

    var _url = 'https://dazzling-heat-875.firebaseio.com/';
    var _ref = new $window.Firebase(_url);

    // Public API here
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
                  bajs: 'name',
                  name: 'bajs'
              }

          });
      },
      test2: function() {
          _ref.child('playlists').once('value', function(data) {
              console.log(data.val());
          });
      }
    };
  });
