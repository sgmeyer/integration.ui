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
                controllerAs: 'at',
                resolve: {
                    testSuites: testSuitesResolver
                }
            })
            .state('Test.TestSuite', {
                url: '/TestSuite',
                templateUrl: '/Template/TestSuite/Index',
                controller: 'testSuiteController',
                controllerAs: 'ts',
                resolve: {
                    tests: testsResolver
                }
            }).state('Test.TestSuite.TestCase', {
                url: '/TestCases',
                templateUrl: '/Template/TestCase/Index',
                controller: 'testCaseController',
                controllerAs: 'tc',
                resolve: {
                    testCases: testCasesResolver
                }
            });
    };


    testSuitesResolver.$inject = ['dataService'];

    function testSuitesResolver(dataService) {
        dataService.setTestCases({});
        dataService.setTests({});
    }

    testsResolver.$inject = ['dataService'];

    function testsResolver(dataService) {
        dataService.setTestCases({});
        return dataService.getTests();
    }

    testCasesResolver.$inject = ['dataService'];

    function testCasesResolver(dataService) {
        return dataService.getTestCases();
    }
})(angular);