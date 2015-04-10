(function(window, angular, undefined) {
  "use-strict";

  var firebase = new Firebase("https://sweltering-torch-73.firebaseio.com/");

  angular.module("ATS.SharedServices").service('FirebaseService', ['$q', '$cookieStore', '$firebaseObject', function($q, $cookieStore, $firebaseObject) {
    
    this.checkIfRoomExists = function(roomId) {
      var deferred = $q.defer();

      firebase.child('rooms').child(roomId).once('value', function(snapshot) {
        exists = (snapshot.val() !== null);
        deferred.resolve(exists);
      });

      return deferred.promise;
    };

    this.destroyRoom = function(roomId) {
      firebase.child('rooms').child(roomId).remove();
    };

    this.destroyUser = function(roomId, userId) {
      firebase.child('rooms').child(roomId).child('users').child(userId).remove();
    };

    this.generateRoomId = function() {
      return Math.floor((Math.random() * 99900000) + 100000).toString();
    };

    this.generateUserId = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    };

    this.getRoom = function(roomId) {
      var ref = firebase.child('rooms').child(roomId);
      return $firebaseObject(ref);
    };

    this.getUser = function(roomId, uuid) {
      var ref = firebase.child('rooms').child(roomId).child('users').child(uuid);
      return $firebaseObject(ref);
    };

    this.newRoom = function(roomId) {
      var room = $firebaseObject(firebase.child('rooms').child(roomId));
      var deckIndex = $cookieStore.get("deckIndex");
      if (!deckIndex) {
        deckIndex = 0;
      }
      var customDeck = $cookieStore.get("deck");
      if (!customDeck) {
        customDeck = {
          name: "Custom Deck",
          type: "nominal",
          cards: []
        };
      }
      angular.extend(room, {
        customDeck: customDeck,
        deckIndex: deckIndex,
        reveal: false,
        updatedAt: Firebase.ServerValue.TIMESTAMP
      });
      room.$save();
    };

    this.newUser = function(roomId, uuid, leader) {
      var user = $firebaseObject(firebase.child('rooms').child(roomId).child('users').child(uuid));
      angular.extend(user, {
        leader: leader,
        vote: null,
        voter: true
      });
      user.$save();
    };
  }]);

})(window, window.angular);