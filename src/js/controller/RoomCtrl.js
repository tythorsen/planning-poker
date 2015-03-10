(function(window, angular, undefined) {
  "use-strict";

  ATS.app.controller("RoomCtrl", ["$rootScope", "$scope", "$routeParams", "$location", "RoomHelper", function($rootScope, $scope, $routeParams, $location, RoomHelper) {
      
    $scope.changeDeck = function() {
      resetVotes();
      $scope.room.updatedAt = Firebase.ServerValue.TIMESTAMP;
      $scope.room.$save();
    };

    $scope.chooseCard = function(cardVal, cardText, cardFA) {
      if ($scope.user.voter) {
        $scope.user.vote = {
          val: cardVal,
          text: cardText,
          fa: cardFA || "" 
        };
        $scope.user.$save();
      }
    };

    $scope.share = function() {
      document.getElementById("share").blur();
      window.prompt("Invite others to the room by sharing this link:", window.location);
    };

    $scope.reset = function() {
      resetVotes();
      $scope.room.updatedAt = Firebase.ServerValue.TIMESTAMP;
      $scope.room.$save();
      document.getElementById("reset").blur();
    };

    $scope.reveal = function() {
      $scope.room.results =ATS.PlanningPoker.getResults($scope.room.users, $scope.selectedDeck);
      $scope.room.reveal = true;
      $scope.room.updatedAt = Firebase.ServerValue.TIMESTAMP;
      $scope.room.$save();
      document.getElementById("reveal").blur();
    };

    $scope.toggleVoter = function() {
      $scope.user.$save();
    };

    $scope.$watch("room.deckIndex", function() {
      $scope.selectedDeck = ATS.PlanningPoker.Decks[$scope.room.deckIndex];
    });

    $scope.$watch("room.users", function() {
      $scope.voteCompletion = ATS.PlanningPoker.calculateVoteCompletion($scope.room.users);
    });

    var roomId = $routeParams.roomId;
    var uuid = $rootScope.uuid;
    RoomHelper.checkIfRoomExists(roomId).then(function(exists) {
      if (exists) {
        $scope.room = RoomHelper.getRoom(roomId);
        if (!uuid) {
          uuid = RoomHelper.generateUserId();
          var leader = false;
          RoomHelper.newUser(roomId, uuid, leader);
        }
        $scope.user = RoomHelper.getUser(roomId, uuid);
        $scope.cardDecks = ATS.PlanningPoker.Decks;
        $scope.selectedDeckIndex = 0;
        $scope.voteCompletion = 0;
        $scope.selectedDeck = ATS.PlanningPoker.Decks[$scope.selectedDeckIndex].cards;
      } else {
        $location.path("/");
      }
    });

    function resetVotes() {
      for (var user in $scope.room.users) {
        $scope.room.users[user].vote = null;
      }
      $scope.room.reveal = false;
      $scope.room.results = null;
    }

    function tearDown() {
      if ($scope.user.leader) {
        ATS.firebase.child('rooms').child($scope.room.$id).remove();
      } else {
        ATS.firebase.child('rooms').child($scope.room.$id).child('users').child($scope.user.$id).remove();
      }
      $rootScope.uuid = null;
    }

    $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
      tearDown();
    });

    window.onbeforeunload = function (event) {
      tearDown();

    };

    $scope.$on('$destroy', function() {
      delete window.onbeforeunload;
    });
  }]);

})(window, window.angular);