(function(window, angular, undefined) {
  "use-strict";

  angular.module('ATS.Contributor').controller("ContributorController",
    ["$rootScope", "$scope", "$location","ContributorFactory", function($rootScope, $scope, $location, ContributorFactory) {
    $scope.showContributors = function(){
      $location.path("/contributors");
    }
  }]);

})(window, window.angular);
