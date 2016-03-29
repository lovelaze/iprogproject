'use strict';

describe('Service: firebasefactory', function () {

  // load the service's module
  beforeEach(module('iprogApp'));

  // instantiate service
  var firebasefactory;
  beforeEach(inject(function (_firebasefactory_) {
    firebasefactory = _firebasefactory_;
  }));

  it('should do something', function () {
    expect(!!firebasefactory).toBe(true);
  });

});
