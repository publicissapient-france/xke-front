'use strict';

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
