(function(window, angular, undefined) {
  "use-strict";

  ATS.app.controller("LandingCtrl", ["$rootScope", "$scope", "$location", "$firebase", "RoomHelper", function($rootScope, $scope, $location, $firebase, RoomHelper) {
      
    $scope.joinRoom = function() {
      $location.path("/"+$scope.roomId);
    };

    $scope.newRoom = function() {
      var newRoomId = RoomHelper.generateRoomId();
      var defaultDeckIndex = 0;
      RoomHelper.newRoom(newRoomId, defaultDeckIndex);
      var uuid = RoomHelper.generateUserId();
      var leader = true;
      RoomHelper.newUser(newRoomId, uuid, leader);
      $rootScope.uuid = uuid;
      $location.path("/"+newRoomId);
    };
  }]);

})(window, window.angular);