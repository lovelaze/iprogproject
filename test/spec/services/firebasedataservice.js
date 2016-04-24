'use strict';

describe('Service: firebasedataservice', function () {

  // load the service's module
  beforeEach(module('iprogApp'));

  // instantiate service
  var firebasedataservice;
  beforeEach(inject(function (_firebasedataservice_) {
    firebasedataservice = _firebasedataservice_;
  }));

  it('should do something', function () {
    expect(!!firebasedataservice).toBe(true);
  });

});
