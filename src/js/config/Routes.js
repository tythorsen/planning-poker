(function(window, angular, undefined) {
  "use-strict";

  ATS.app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'LandingCtrl',
        templateUrl: 'views/landing.html'
      })
      .when('/:roomId/', {
        controller: 'RoomCtrl',
        templateUrl: 'views/room.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

})(window, window.angular);