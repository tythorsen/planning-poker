(function(window, undefined) {
  "use strict";
 
  if (!window.namespace) {
    window.namespace = function namespace(namespaceString) {
      var parts = namespaceString.split('.'), parent = window, currentPart = '';
 
      for ( var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
      }
 
      return parent;
    };
  }
})(window);
(function(window, angular, undefined) {
  "use-strict";

  var ATS = namespace("ATS");
  angular.extend(ATS, {
    app: angular.module('ats', ['ngRoute', 'ngMaterial', 'firebase']),
    firebase: new Firebase("https://sweltering-torch-73.firebaseio.com/")
  });

})(window, window.angular);
(function(window, angular, undefined) {
  "use-strict";

  var PlanningPoker = namespace("ATS.PlanningPoker");
  angular.extend(PlanningPoker, {
    
    calculateVoteCompletion: function(users) {
      var voteCount = 0;
      var voterCount = 0;

      angular.forEach(users, function(user, key) {
        if (user.voter) {
          voterCount++;
          if (user.vote) {
            voteCount++;
          }
        }
      });

      if (voterCount) {
        return voteCount * 100 / voterCount;
      } else {
        return 0;
      }
    },

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

})(window, window.angular);
(function(window, angular, undefined) {
  "use-strict";

	var PlanningPoker = namespace("ATS.PlanningPoker");
	angular.extend(PlanningPoker, {
		Decks: [
	    {
	      name: "Mountain Goat",
	      type: "ordinal",
	      cards: [
	        {
	          text: "0",
	          val: 0
	        },
	        {
	          text: ".5",
	          val: 0.5
	        },
	        {
	          text: "1",
	          val: 1
	        },
	        {
	          text: "2",
	          val: 2
	        },
	        {
	          text: "3",
	          val: 3
	        },
	        {
	          text: "5",
	          val: 5
	        },
	        {
	          text: "8",
	          val: 8
	        },
	        {
	          text: "13",
	          val: 13
	        },
	        {
	          text: "20",
	          val: 20
	        },
	        {
	          text: "40",
	          val: 40
	        },
	        {
	          text: "100",
	          val: 100
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Fibonacci",
	      type: "ordinal",
	      cards: [
	        {
	          text: "0",
	          val: 0
	        },
	        {
	          text: "1",
	          val: 1
	        },
	        {
	          text: "2",
	          val: 2
	        },
	        {
	          text: "3",
	          val: 3
	        },
	        {
	          text: "5",
	          val: 5
	        },
	        {
	          text: "8",
	          val: 8
	        },
	        {
	          text: "13",
	          val: 13
	        },
	        {
	          text: "21",
	          val: 21
	        },
	        {
	          text: "34",
	          val: 34
	        },
	        {
	          text: "55",
	          val: 55
	        },
	        {
	          text: "89",
	          val: 89
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Sequential",
	      type: "ordinal",
	      cards: [
	        {
	          text: "0",
	          val: 0
	        },
	        {
	          text: "1",
	          val: 1
	        },
	        {
	          text: "2",
	          val: 2
	        },
	        {
	          text: "3",
	          val: 3
	        },
	        {
	          text: "4",
	          val: 4
	        },
	        {
	          text: "5",
	          val: 5
	        },
	        {
	          text: "6",
	          val: 6
	        },
	        {
	          text: "7",
	          val: 7
	        },
	        {
	          text: "8",
	          val: 8
	        },
	        {
	          text: "9",
	          val: 9
	        },
	        {
	          text: "10",
	          val: 10
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "T-Shirt",
	      type: "ordinal",
	      cards: [
	        {
	          text: "XS",
	          val: 1
	        },
	        {
	          text: "S",
	          val: 2
	        },
	        {
	          text: "M",
	          val: 3
	        },
	        {
	          text: "L",
	          val: 4
	        },
	        {
	          text: "XL",
	          val: 5
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Lunch Plans",
	      type: "nominal",
	      cards: [
	        {
	          text: "Pizza",
	          val: 1
	        },
	        {
	          text: "Asian",
	          val: 2
	        },
	        {
	          text: "Burgers",
	          val: 3
	        },
	        {
	          text: "Sandwiches",
	          val: 4
	        },
	        {
	          text: "Greek",
	          val: 5
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Charities",
	      type: "nominal",
	      cards: [
	        {
	          text: "MN Armed Forces",
	          val: 1
	        },
	        {
	          text: "Humane Society",
	          val: 2
	        },
	        {
	          text: "Pride in Living",
	          val: 3
	        },
	        {
	          text: "Second Harvest",
	          val: 4
	        },
	        {
	          text: "Conservation MN",
	          val: 5
	        },
	        {
	          text: "Leonardo's Basement",
	          val: 6
	        }
	      ]
	    }
	  ]
	});
 })(window, window.angular);
(function(window, angular, undefined) {
  "use-strict";

  ATS.app.config(["$mdThemingProvider", function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .warnPalette('grey');
  }]);

})(window, window.angular);
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
(function(window, angular, undefined) {
  "use-strict";

  ATS.app.factory('RoomHelper', ['$q', '$firebase', function($q, $firebase) {
    return {
      checkIfRoomExists: function(roomId) {
        var deferred = $q.defer();

        ATS.firebase.child('rooms').child(roomId).once('value', function(snapshot) {
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
        var ref = ATS.firebase.child('rooms').child(roomId);
        return $firebase(ref).$asObject();
      },

      getUser: function(roomId, uuid) {
        var ref = ATS.firebase.child('rooms').child(roomId).child('users').child(uuid);
        return $firebase(ref).$asObject();
      },

      newRoom: function(roomId, deckIndex) {
        $firebase(ATS.firebase.child('rooms').child(roomId)).$set({
          deckIndex: deckIndex,
          reveal: false,
          updatedAt: Firebase.ServerValue.TIMESTAMP
        });
      },

      newUser: function(roomId, uuid, leader) {
        $firebase(ATS.firebase.child('rooms').child(roomId).child('users').child(uuid)).$set({
          leader: leader,
          vote: null,
          voter: true
        });
      }
    };
  }]);

})(window, window.angular);
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