(function (angular, document) {
    'use strict';

    var mod = angular.module('hallmark.common.interceptors', []);

    mod.factory('httpRequestInterceptorCacheFix', ['$q', function ($q) {
        return {
            'request': function (request) {
                if (request.method === 'GET') {
                    if (request.url.indexOf("html") === -1) {
                        var sep = request.url.indexOf('?') === -1 ? '?' : '&';
                        request.url = request.url + sep + 'cacheBuster=' + new Date().getTime();
                    }
                }
                return request || $q.when(request);
            }
        };
    }]);

    mod.factory('entityKeyInterceptor', ['$rootScope', function ($rootScope) {

        var entityKeyInterceptor = {};
        var request = function (config) {
            if ($rootScope.entityKey) {
                config.headers = config.headers || {};
                config.headers["Hbc-EntityKey"] = $rootScope.entityKey;
            }
            return config;
        };

        entityKeyInterceptor.request = request;
        return entityKeyInterceptor;
    }]);
}(angular, document));