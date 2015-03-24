(function(window, angular, undefined) {
  "use-strict";

  var MAX_CARDS = 15;

  angular.module('ATS.Room').controller('DeckController', ['$scope', "$mdDialog", 'deck', function($scope, $mdDialog, deck) {
      
      $scope.deck = deck;
      
      $scope.addCard = function() {
        $scope.deck.cards = $scope.deck.cards || [];
        if ($scope.deck.cards.length < MAX_CARDS) {
          $scope.deck.cards.push({
            text: "NewCard" + ($scope.deck.cards.length + 1).toString(),
            val: -1,
            fa: ""
          });
        }
      };

      $scope.canAddCard = function() {
        return !$scope.deck.cards || $scope.deck.cards.length < MAX_CARDS;
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.hasCards = function() {
        return $scope.deck.cards && $scope.deck.cards.length > 0;
      };

      $scope.remove = function(card) {
        var index = $scope.deck.cards.indexOf(card);
        $scope.deck.cards.splice(index, 1);
      };

      $scope.save = function() {
        $mdDialog.hide(polishDeck($scope.deck));
      };

      function polishDeck(deck) {
        var cards = [];
        angular.forEach(deck.cards, function(value, key) {
          cards.push({
            text: value.text,
            val: angular.isNumber(value.text) ? Float.valueOf(value.text) : key,
            fa: ""
          });
        });
        deck.cards = cards;
        return deck;
      }
  }]);

})(window, window.angular);