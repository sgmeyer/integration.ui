(function (angular) {
    'use strict';

    angular.module('hallmark.common')
        .factory('entityKeyInterceptor', entityKeyInterceptor);

    entityKeyInterceptor.$inject = ['$rootScope'];

    function entityKeyInterceptor($rootScope) {
        var interceptor = {};
        var theRequest = function (config) {
            if ($rootScope.entityKey) {
                config.headers = config.headers || {};
                config.headers["Hbc-EntityKey"] = $rootScope.entityKey;
            }
            return config;
        };

        interceptor.request = theRequest;
        return interceptor;
    };
}(angular));