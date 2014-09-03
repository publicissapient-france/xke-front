'use strict';

var types = ['Contest', 'Demo', 'Debate', 'Dojo', 'Formal', 'Hackathon', 'Hands-on', 'Other', 'Quickie', 'Training'];
var durations = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240];
var fondations = ['Craft', 'Mobile', 'Agile', 'Front', 'Back', 'Data', 'Cloud', 'DevOps', 'Divers'];

angular.module('xke')
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
