'use strict';

describe('Directive: bookingCalendar', function () {

  // load the directive's module
  beforeEach(module('hyenaReservationsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<booking-calendar></booking-calendar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bookingCalendar directive');
  }));
});
