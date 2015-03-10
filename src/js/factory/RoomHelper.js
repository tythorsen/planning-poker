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