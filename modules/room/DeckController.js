(function(window, angular, undefined) {
  "use-strict";

  var MAX_CARDS = 15;

  angular.module('ATS.Room').controller('DeckController', ['$scope', "$mdDialog", 'deck', function($scope, $mdDialog, deck) {
      
      $scope.deck = deck;
      
      $scope.addCard = function() {
        $scope.deck.cards = $scope.deck.cards || [];
        if ($scope.deck.cards.length < MAX_CARDS) {
          $scope.deck.cards.push({
            text: "New Card",
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

      $scope.save = function() {
        $mdDialog.hide(scrubHashKeys($scope.deck));
      };

      function scrubHashKeys(deck) {
        angular.forEach(deck.cards, function(value, key) {
          delete value.$$hashKey;
        });
        return deck;
      }
  }]);

})(window, window.angular);