'use strict';

angular.module('xke')
  .controller('ListSlotCtrl', function ($scope, $http, $location) {

    $scope.slotsJustPlayed = [];
    $scope.xkeDate = new Date();

    $http.get('/api/slots', {params: {type: 'in_progress'}})
      .success(function (data) {
        $scope.readySlots = data;
      });

    $http.get('/api/slots', {params: {type: 'idea'}})
      .success(function (data) {
        $scope.ideas = data;
      });

    $scope.edit = function (slot) {
      console.log(JSON.stringify(slot._id));
      $location.path('/edit/' + slot._id);
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

    $scope.addOrRemoveSlotToPlayedArray = function (slot) {
      var slotPosition = $scope.slotsJustPlayed.indexOf(slot);
      if (slotPosition === -1) {
        $scope.slotsJustPlayed.push(slot);
      } else {
        $scope.slotsJustPlayed.splice(slotPosition, 1);
      }
    };

    $scope.playedAt = function () {
      $scope.slotsJustPlayed.forEach(function (slot) {
        slot.playedDates.push($scope.xkeDate);
        $http.put('/api/slots/' + slot.id, slot);
      });
      // Message d'erreur et de succès ?
      $scope.slotsJustPlayed = [];
      $scope.xkeDate = new Date();
    };

  });
