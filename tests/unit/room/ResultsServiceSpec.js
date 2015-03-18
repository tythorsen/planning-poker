(function(window, undefined) {
	"use strict";

	describe("Voting Results Service", function() {

		beforeEach(module('ATS.Room'));

		var ResultsService;

		beforeEach(inject(function(_ResultsService_) {
			ResultsService = _ResultsService_;
		}))

		it("calculates vote completion", function() {
			var users = [
				{ voter: false },
				{ voter: true },
				{ voter: true, vote: "Vote" }
			];
			var expected = 50;
			expect(ResultsService.calculateVoteCompletion(users)).toEqual(expected);
		});

	  describe("determines consensus level", function() {

	  	it("when the vote result is unanimous", function() {
	  		var bestGuesses  = ["vote"];
	  		var consensusPercentage = 1;
	  		var expected = "Unanimous";
	   	  expect(ResultsService.getConsensusLevel(bestGuesses, consensusPercentage)).toEqual(expected);
	   	});

	   	it("when the vote result is consensus", function() {
	  		var bestGuesses  = ["vote"];
	  		var consensusPercentage = 0.75;
	  		var expected = "Consensus";
	   	  expect(ResultsService.getConsensusLevel(bestGuesses, consensusPercentage)).toEqual(expected);
	   	});

	   	it("when the vote result is a majority", function() {
	  		var bestGuesses  = ["vote"];
	  		var consensusPercentage = 0.5;
	  		var expected = "Majority";
	   	  expect(ResultsService.getConsensusLevel(bestGuesses, consensusPercentage)).toEqual(expected);
	   	});

	   	it("when the vote result is a plurality", function() {
	  		var bestGuesses  = ["vote"];
	  		var consensusPercentage = 0.4;
	  		var expected = "Plurality";
	   	  expect(ResultsService.getConsensusLevel(bestGuesses, consensusPercentage)).toEqual(expected);
	   	});

	   	it("when the vote result is a tie", function() {
	  		var bestGuesses  = ["vote", "vote"];
	  		var consensusPercentage = 0.4;
	  		var expected = "Tie";
	   	  expect(ResultsService.getConsensusLevel(bestGuesses, consensusPercentage)).toEqual(expected);
	   	});
	  });
	});

})(window);