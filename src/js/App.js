(function(window, angular, undefined) {
  "use-strict";

  var ATS = namespace("ATS");
  angular.extend(ATS, {
    app: angular.module('ats', ['ngRoute', 'ngMaterial', 'firebase']),
    firebase: new Firebase("https://sweltering-torch-73.firebaseio.com/")
  });

})(window, window.angular);