(function(window, angular, undefined) {
  "use-strict";

  ATS.app.config(["$mdThemingProvider", function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .warnPalette('grey');
  }]);

})(window, window.angular);