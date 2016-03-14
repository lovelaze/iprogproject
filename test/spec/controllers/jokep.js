'use strict';

describe('Controller: JokepCtrl', function () {

  // load the controller's module
  beforeEach(module('iprogApp'));

  var JokepCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JokepCtrl = $controller('JokepCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JokepCtrl.awesomeThings.length).toBe(3);
  });
});
