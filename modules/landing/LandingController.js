(function(window, angular, undefined) {
  "use-strict";

  angular.module('ATS.Landing').controller("LandingController", ["$rootScope", "$scope", "$location", "$firebase", "FirebaseService", function($rootScope, $scope, $location, $firebase, FirebaseService) {
      
    $scope.joinRoom = function() {
      $location.path("/"+$scope.roomId);
    };

    $scope.newRoom = function() {
      var newRoomId = FirebaseService.generateRoomId();
      var defaultDeckIndex = 0;
      FirebaseService.newRoom(newRoomId, defaultDeckIndex);
      var uuid = FirebaseService.generateUserId();
      var leader = true;
      FirebaseService.newUser(newRoomId, uuid, leader);
      $rootScope.uuid = uuid;
      $location.path("/"+newRoomId);
    };
  }]);

})(window, window.angular);