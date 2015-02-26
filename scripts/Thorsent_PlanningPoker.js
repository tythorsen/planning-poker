(function(window, angular, undefined) {
  "use-strict";

  var PlanningPoker = namespace("Thorsent.PlanningPoker");
  extend(PlanningPoker, {

    getConsensusLevel: function(bestGuesses, consensusPercentage) {
      if (bestGuesses.length !== 1) {
        return "Too Close To Call";
      } else if (consensusPercentage === 1) {
        return "Unanimous";
      } else if (consensusPercentage >= 0.75) {
        return "Consensus";
      } else if (consensusPercentage >= 0.5) {
        return "Majority";
      } else {
        return "Plurality";
      }
    },

    getMedianVote: function(users) {
      var voteMap = this.mapVotesOrdinal(users);
      if (voteMap.length === 0) {
        return [];
      } else if (voteMap.length % 2 === 0) {
        return [voteMap[voteMap.length/2]];
      } else {
        return [voteMap[Math.floor(voteMap.length/2)]];
      }
    },

    getResults: function(users, deck) {
      if (deck.type === "ordinal") {
        return this.getResultsOrdinal(users);
      } else {
        return this.getResultsNominal(users);
      }
    },

    getResultsNominal: function(users) {
      var voteMap = this.mapVotesNominal(users);
      var totalVotes = 0;
      var bestGuesses = [];
      var max = 0;

      angular.forEach(voteMap, function(voteObj, vote) {
        totalVotes += voteObj.count;
        if (voteObj.count > max) {
          bestGuesses = [voteObj.card];
          max = voteObj.count;
        } else if (voteObj.count === max) {
          bestGuesses.push(voteObj.card);
        }
      });

      return {
        consensusLevel: this.getConsensusLevel(bestGuesses, max/totalVotes),
        cards: bestGuesses
      };
    },

    getResultsOrdinal: function(users) {
      return {
        consensusLevel: "Best Guess (Median)",
        cards: this.getMedianVote(users)
      };
    },

    mapVotesNominal: function(users) {
      var voteMap = {};

      angular.forEach(users, function(user, key) {
        if (user.vote) {
          if (voteMap[user.vote.text]) {
            voteMap[user.vote.text].count++;
          } else {
            voteMap[user.vote.text] = {
              card: user.vote,
              count: 1
            };
          }
        }
      });

      return voteMap;
    },

    mapVotesOrdinal: function(users) {
      var voteMap = [];

      angular.forEach(users, function(user, key) {
        if (user.vote && user.vote.val >= 0) {
          voteMap.push(user.vote);
        }
      });

      voteMap.sort(function(a, b) {
        if (a.val <= b.val) {
          return -1;
        } else {
          return 1;
        }
      });

      return voteMap;
    }
  });  

  var firebase = new Firebase("https://sweltering-torch-73.firebaseio.com/");
  var CardDecks = Thorsent.PlanningPoker.Decks;

  angular.module('thorsent', ['ngRoute', 'ngMaterial', 'firebase'])

    .config(["$mdThemingProvider", function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .warnPalette('grey');
    }])

    .config(['$routeProvider', function($routeProvider) {
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
    }])

    .factory('RoomHelper', ['$q', '$firebase', function($q, $firebase) {
      return {
        checkIfRoomExists: function(roomId) {
          var deferred = $q.defer();

          firebase.child('rooms').child(roomId).once('value', function(snapshot) {
            exists = (snapshot.val() !== null);
            deferred.resolve(exists);
          });

          return deferred.promise;
        },

        generateRoomId: function() {
          return Math.floor((Math.random() * 99900000) + 100000).toString();
        },

        generateUserId: function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        },

        getRoom: function(roomId) {
          var ref = firebase.child('rooms').child(roomId);
          return $firebase(ref).$asObject();
        },

        getUser: function(roomId, uuid) {
          var ref = firebase.child('rooms').child(roomId).child('users').child(uuid);
          return $firebase(ref).$asObject();
        },

        newRoom: function(roomId, deckIndex) {
          $firebase(firebase.child('rooms').child(roomId)).$set({
            deckIndex: deckIndex,
            reveal: false,
            updatedAt: Firebase.ServerValue.TIMESTAMP
          });
        },

        newUser: function(roomId, uuid, leader) {
          $firebase(firebase.child('rooms').child(roomId).child('users').child(uuid)).$set({
            leader: leader,
            vote: null,
            voter: true
          });
        }
      };
    }])

    .controller("LandingCtrl", ["$rootScope", "$scope", "$location", "$firebase", "RoomHelper", function($rootScope, $scope, $location, $firebase, RoomHelper) {
      
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
    }])

    .controller("RoomCtrl", ["$rootScope", "$scope", "$routeParams", "$location", "RoomHelper", function($rootScope, $scope, $routeParams, $location, RoomHelper) {
      
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
        window.prompt("Invite other to the room by sharing this link:", window.location);
      };

      $scope.reset = function() {
        resetVotes();
        $scope.room.updatedAt = Firebase.ServerValue.TIMESTAMP;
        $scope.room.$save();
        document.getElementById("reset").blur();
      };

      $scope.reveal = function() {
        $scope.room.results = PlanningPoker.getResults($scope.room.users, $scope.selectedDeck);
        $scope.room.reveal = true;
        $scope.room.updatedAt = Firebase.ServerValue.TIMESTAMP;
        $scope.room.$save();
        document.getElementById("reveal").blur();
      };

      $scope.toggleVoter = function() {
        $scope.user.$save();
      };

      $scope.$watch("room.deckIndex", function() {
        $scope.selectedDeck = CardDecks[$scope.room.deckIndex];
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
          $scope.cardDecks = CardDecks;
          $scope.selectedDeckIndex = 0;
          $scope.selectedDeck = CardDecks[$scope.selectedDeckIndex].cards;
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
          firebase.child('rooms').child($scope.room.$id).remove();
        } else {
          firebase.child('rooms').child($scope.room.$id).child('users').child($scope.user.$id).remove();
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

  function checkIfRoomExists(roomId) {
    var exists = false;
    return firebase.child('rooms').child(roomId).once('value', function(snapshot) {
      exists = (snapshot.val() !== null);
    });
  }

})(window, window.angular);
