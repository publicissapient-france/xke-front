'use strict';

angular.module('xke')
  .controller('CreateSlotCtrl', function ($scope, $location, $http, types, durations, fondations) {
    $scope.saving = false;

    $scope.types = types;
    $scope.durations = durations;
    $scope.fondations = fondations;

    $scope.slot = {type: types[0], fondation: fondations[0], duration: durations[0], pitch: null};

    $scope.speakers = [
      {
        username: 'test speaker'
      }
    ];


// Ask FLorent
//  $http.get('/api/user')
//    .success(function (data) {
//      $scope.speakers = data;
//    })
//  ;

    $scope.save = function () {
      $scope.slot.creator = $scope.username;
      if (!$scope.slot.speakers) {
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
  });
