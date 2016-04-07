'use strict';

describe('Service: soundcloudfactory', function () {

  // Load the service's module
  beforeEach(module('iprogApp'));

  // instantiate service
  var soundcloudfactory;
  beforeEach(inject(function (_soundcloudfactory_) {
    soundcloudfactory = _soundcloudfactory_;
  }));

  it('should do something', function () {
    expect(!!soundcloudfactory).toBe(true);
  });
  
});
