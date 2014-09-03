'use strict';

angular.module('xke')
  .controller('EditSlotCtrl', function ($scope, $location, $routeParams, $http, types, durations, fondations) {
    var self = this;

    $scope.types = types;
    $scope.durations = durations;
    $scope.fondations = fondations;

    $scope.slotId = $routeParams.slotId;

    $http.get('/api/users')
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

    $scope.transformIntoIdea = function () {
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
  });
