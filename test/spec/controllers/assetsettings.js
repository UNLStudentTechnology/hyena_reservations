'use strict';

describe('Controller: AssetsettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('hyenaReservationsApp'));

  var AssetsettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssetsettingsCtrl = $controller('AssetsettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
