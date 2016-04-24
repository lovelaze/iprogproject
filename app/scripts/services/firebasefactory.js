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

  });
