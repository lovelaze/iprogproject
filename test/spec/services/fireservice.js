'use strict';

describe('Service: fireservice', function () {

  // load the service's module
  beforeEach(module('iprogApp'));

  // instantiate service
  var fireservice;
  beforeEach(inject(function (_fireservice_) {
    fireservice = _fireservice_;
  }));

  it('should do something', function () {
    expect(!!fireservice).toBe(true);
  });

});
