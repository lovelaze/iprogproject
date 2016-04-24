'use strict';

describe('Service: firebaseauthfactory', function () {

  // load the service's module
  beforeEach(module('iprogApp'));

  // instantiate service
  var firebaseauthfactory;
  beforeEach(inject(function (firebaseauthfactory) {
    firebaseauthfactory = firebaseauthfactory;
  }));

  it('should do something', function () {
    expect(!!firebaseauthfactory).toBe(true);
  });

});
