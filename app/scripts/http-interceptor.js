'use strict';

angular.module('xke').config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push([function () {
        return {
            'request': function(config) {
                if (config.url.indexOf('/api') === 0) {
                    config.url = 'http://xke-test.xebiafr.eu.cloudbees.net' + config.url;
                }

                return config;
            }
        };
    }]);
}]);