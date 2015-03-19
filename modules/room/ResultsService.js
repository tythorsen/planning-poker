(function(window, angular, undefined) {
  "use-strict";

  angular.module("ATS.Room").service('ResultsService', function() {
    
    this.calculateVoteCompletion = function(users) {
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
    };

    this.getConsensusLevel = function(bestGuesses, consensusPercentage) {
      if (bestGuesses.length !== 1) {
        return "Tie";
      } else if (consensusPercentage === 1) {
        return "Unanimous";
      } else if (consensusPercentage >= 0.75) {
        return "Consensus";
      } else if (consensusPercentage >= 0.5) {
        return "Majority";
      } else {
        return "Plurality";
      }
    };

    this.getMedianVote = function(users) {
      var voteMap = this.mapVotesOrdinal(users);
      if (voteMap.length === 0) {
        return [];
      } else if (voteMap.length % 2 === 0) {
        return [voteMap[voteMap.length/2]];
      } else {
        return [voteMap[Math.floor(voteMap.length/2)]];
      }
    };

    this.getResults =function(users, deck) {
      if (deck.type === "ordinal") {
        return this.getResultsOrdinal(users);
      } else {
        return this.getResultsNominal(users);
      }
    };

    this.getResultsNominal = function(users) {
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
    };

    this.getResultsOrdinal = function(users) {
      return {
        consensusLevel: "Best Guess (Median)",
        cards: this.getMedianVote(users)
      };
    };

    this.mapVotesNominal = function(users) {
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
    };

    this.mapVotesOrdinal =  function(users) {
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
    };
  });

})(window, window.angular);