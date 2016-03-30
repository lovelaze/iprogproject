'use strict';

describe('Controller: SoundcloudCtrl', function () {

  // load the controller's module
  beforeEach(module('iprogApp'));

  var SoundcloudCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SoundcloudCtrl = $controller('SoundcloudCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SoundcloudCtrl.awesomeThings.length).toBe(3);
  });
});
