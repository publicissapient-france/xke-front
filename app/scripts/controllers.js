'use strict';

var types = ['Contest', 'Demo', 'Debate', 'Dojo', 'Formal', 'Hackathon', 'Hands-on', 'Other', 'Quickie', 'Training'];
var durations = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240];
var fondations = ['Craft', 'Mobile', 'Agile', 'Front', 'Back', 'Data', 'Cloud', 'DevOps', 'Divers'];

angular.module('xke')
  .controller('ListSlotCtrl', function ($scope, $http, $location) {

  $scope.slotsJustPlayed = [];
  $scope.xkeDate = new Date();

  $http.get('/api/slots')
    .success(function (data) {
      $scope.slots = data;
    })
  ;

  $scope.edit = function (slot) {
    $location.path('/edit/' + slot.id);
  };

  $scope.takeIdea = function (idea) {
    var position = $scope.slots.ideas.indexOf(idea);
    idea.speakers.push($scope.username);
    $http.put('/api/slots/' + idea.id, idea)
      .success(function (slot) {
        $scope.slots.ideas.splice(position, 1);
        $scope.slots.readySlots.push(slot);
      })
    ;
  };

  $scope.addOrRemoveSlotToPlayedArray = function(slot) {
    var slotPosition = $scope.slotsJustPlayed.indexOf(slot);
    if (slotPosition === -1) {
      $scope.slotsJustPlayed.push(slot);
    } else {
      $scope.slotsJustPlayed.splice(slotPosition, 1);
    }
  };

  $scope.playedAt = function() {
    $scope.slotsJustPlayed.forEach(function (slot) {
      slot.playedDates.push($scope.xkeDate);
      $http.put('/api/slots/' + slot.id, slot);
    });
    // Message d'erreur et de succès ?
    $scope.slotsJustPlayed = [];
    $scope.xkeDate = new Date();
  };

})
  .controller('CreateSlotCtrl', function ($scope, $location, $http) {
  $scope.saving = false;

  $scope.types = types;
  $scope.durations = durations;
  $scope.fondations = fondations;

  $scope.slot = {type: types[0], fondation: fondations[0], duration: durations[0], pitch: null};

  $http.get('/api/user')
    .success(function (data) {
      $scope.speakers = data;
    })
  ;

  $scope.save = function () {
    $scope.slot.creator = $scope.username;
    if ($scope.slot.speakers === null) {
      $scope.slot.speakers = [];
    }
    $scope.slot.playedDates = [];
    $scope.saving = true;
    // TODO 1 : appeler un service qui va enregistrer le slot
    $http.post('/api/slots', $scope.slot)
      .success(function () {
        $scope.saving = false;
        $location.path('/');
      })
      .error(function () {
        $scope.saving = false;
      })
    ;
  };
})
  .controller('EditSlotCtrl', function ($scope, $location, $routeParams, $http) {
  var self = this;

  $scope.types = types;
  $scope.durations = durations;
  $scope.fondations = fondations;

  $scope.slotId = $routeParams.slotId;

  $http.get('/api/user')
    .success(function (data) {
      $scope.speakers = data;
    })
  ;

  $http.get('/api/slots/' + $routeParams.slotId)
    .success(function (data) {
      $scope.slot = data;
    })
  ;

  $scope.isClean = function () {
    return angular.equals(self.original, $scope.slot);
  };

  $scope.destroy = function () {
    // TODO 1 : appeler un service qui va supprimer le slot
    $http.delete('/api/slots/' + $routeParams.slotId)
      .success(function () {
        $location.path('/');
      })
    ;
  };

  $scope.transformIntoIdea = function() {
    $scope.slot.speakers = [];
    $http.put('/api/slots/' + $scope.slot.id, $scope.slot)
      .success(function () {
        $location.path('/');
      })
    ;
  };

  $scope.save = function () {
    // TODO 1 : appeler un service qui va mettre-à-jour le slot
    $scope.slot.title = $scope.slot.title.replace(/"/g, '\\\"');
    $http.put('/api/slots/' + $scope.slot.id, $scope.slot)
      .success(function () {
        $location.path('/');
      })
    ;
  };
})
  .controller('ListUsersCtrl', function ($scope, $http) {

  $http.get('/api/user')
    .success(function (data) {
      $scope.users = data;
    })
  ;
})
  .controller('ShowUsersCtrl', function ($scope, $http, $routeParams) {

  $http.get('/api/user/' + $routeParams.userId)
    .success(function (data) {
      $scope.userInfo = data;
    })
  ;
});
