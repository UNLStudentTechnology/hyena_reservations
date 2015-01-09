'use strict';

describe('Service: ReservationService', function () {

  // load the service's module
  beforeEach(module('hyenaAppsApp'));

  // instantiate service
  var ReservationService;
  beforeEach(inject(function (_ReservationService_) {
    ReservationService = _ReservationService_;
  }));

  it('should do something', function () {
    expect(!!ReservationService).toBe(true);
  });

});
