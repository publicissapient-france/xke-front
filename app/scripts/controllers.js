'use strict';

angular.module('xke')
  .controller('ListUsersCtrl', function ($scope, $http) {

    $http.get('/api/users')
      .success(function (data) {
        $scope.users = data;
      })
    ;
  })
  .controller('ShowUsersCtrl', function ($scope, $http, $routeParams) {

    $http.get('/api/users/' + $routeParams.userId)
      .success(function (data) {
        $scope.userInfo = data;
      })
    ;
  });
