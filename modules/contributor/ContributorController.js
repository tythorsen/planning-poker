(function(window, angular, undefined) {
  "use-strict";

  angular.module('ATS.Contributor').controller("ContributorController",
    ["$scope", "$location","ContributorFactory", "SupporterFactory", function($scope, $location, ContributorFactory, SupporterFactory) {
      $scope.contributors = ContributorFactory.getContributors();
      $scope.supporters = SupporterFactory.getSupporters();
  }]);
})(window, window.angular);
