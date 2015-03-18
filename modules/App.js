(function(window, angular, undefined) {
  "use-strict";

  angular.module('ATS', ['ngRoute', 'ngMaterial', 'ATS.Landing', 'ATS.Room'])
  	
  	.config(["$mdThemingProvider", function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .warnPalette('grey');
  	}])

  	.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'LandingController',
        templateUrl: 'modules/landing/landing.html'
      })
      .when('/:roomId/', {
        controller: 'RoomController',
        templateUrl: 'modules/room/room.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  	}]);

})(window, window.angular);