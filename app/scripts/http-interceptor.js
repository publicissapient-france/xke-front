'use strict';

angular.module('xke').config(['$httpProvider', function ($httpProvider) {
  var backendUrl = 'http://localhost:8080';

  if (/xebia-france\.github\.io/.test(window.location.hostname)) {
    backendUrl = 'http://xke-test.xebiafr.eu.cloudbees.net'; // prod url for API
  }

    $httpProvider.interceptors.push([function () {
        return {
            'request': function(config) {
                if (config.url.indexOf('/api') === 0) {
                    config.url = backendUrl + config.url;
                }

                return config;
            }
        };
    }]);
}]);
