(function (angular) {
    'use strict';

    angular
        .module('hallmark.integration-ui')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/Home");
        $stateProvider
            .state('Home', {
                url: '/Home',
                templateUrl: '/Template/TestSuite/Index',
                controller: 'homeController',
                controllerAs: 'home'
            });
    };

})(angular);