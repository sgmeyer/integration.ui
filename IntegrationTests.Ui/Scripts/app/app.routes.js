(function(angular) {
    'use strict';

    angular
        .module('hallmark.integration-ui')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$injector'];

    function config($stateProvider, $urlRouterProvider, $injector) {
        $urlRouterProvider.otherwise("/Test");
        $stateProvider
            .state('Test', {
                url: '/Test',
                templateUrl: '/Template/AllTests/Index',
                controller: 'allTestsController',
                controllerAs: 'at'
            })
            .state('Test.TestSuite', {
                url: '/:suiteIndex',
                templateUrl: '/Template/TestSuite/Index',
                controller: 'testSuiteController',
                controllerAs: 'ts',
                resolve: {
                    suiteIndex: testsResolver
                }
            }).state('Test.TestSuite.TestCase', {
                url: '/:testIndex',
                templateUrl: '/Template/TestCase/Index',
                controller: 'testCaseController',
                controllerAs: 'tc',
                resolve: {
                    suiteIndex: testsResolver,
                    testIndex: testCasesResolver
                }
            });
    };

    testsResolver.$inject = ['$stateParams'];

    function testsResolver($stateParams) {
        return $stateParams['suiteIndex'];
    }

    testCasesResolver.$inject = ['$stateParams'];

    function testCasesResolver($stateParams) {
        return $stateParams['testIndex'];
    }
})(angular);