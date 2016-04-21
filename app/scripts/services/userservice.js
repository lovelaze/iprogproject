'use strict';

/**
 * @ngdoc service
 * @name iprogApp.UserService
 * @description
 * # UserService
 * Service in the iprogApp.
 */
angular.module('iprogApp')
  .service('UserService', function () {

     this.loggedIn = false;
     this.authData = undefined;

    // AngularJS will instantiate a singleton by calling "new" on this function

  });
