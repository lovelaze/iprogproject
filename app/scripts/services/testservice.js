'use strict';

/**
 * @ngdoc service
 * @name appApp.testService
 * @description
 * # testService
 * Service in the appApp.
 */
angular.module('appApp')
  .service('testService', function () {

    this.fisk = 'asdfasdf';

    this.getFish = function() {
      return this.fisk;
    };

    // AngularJS will instantiate a singleton by calling "new" on this function
  });
