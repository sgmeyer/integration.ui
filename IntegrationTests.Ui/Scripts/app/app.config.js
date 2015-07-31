(function (angular) {
    'use strict';

    angular
        .module('hallmark.integration-ui')
        .config(config);

    config.$inject = ['$httpProvider'];
    
    function config ($httpProvider) {
        $httpProvider.interceptors.push('entityKeyInterceptor');
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

})(angular);