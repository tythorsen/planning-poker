(function(window, angular, undefined) {
  "use-strict";

  angular.module('ATS.Contributor').controller("ContributorController",
    ["$scope", "$location","ContributorFactory", function($scope, $location, ContributorFactory) {
      $scope.contributors = ContributorFactory.getContributors();

  }]);
})(window, window.angular);
