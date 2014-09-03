'use strict';

angular.module('xke', ['ngRoute', 'ui.select2'])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json'};
    $routeProvider
      .when('/', { templateUrl: 'views/slot/list.html', controller: 'ListSlotCtrl' })
      .when('/new', { templateUrl: 'views/slot/detail.html', controller: 'CreateSlotCtrl' })
      .when('/edit/:slotId', { templateUrl: 'views/slot/detail.html', controller: 'EditSlotCtrl' })
      .when('/idea/new', { templateUrl: 'views/idea/detail.html', controller: 'CreateSlotCtrl' })
      .when('/idea/edit/:slotId', { templateUrl: 'views/idea/detail.html', controller: 'EditSlotCtrl' })
      .when('/users', { templateUrl: 'views/users/list.html', controller: 'ListUsersCtrl' })
      .when('/users/:userId', { templateUrl: 'views/users/show.html', controller: 'ShowUsersCtrl' })
      .otherwise({ redirectTo: '/' });
  });
