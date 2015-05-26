(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .controller('testSuiteController', testSuiteController);

    testSuiteController.$inject = ['$state', 'dataService', 'tests'];

    function testSuiteController($state, dataService, tests) {
        var vm = this;
        vm.tests = tests;
        vm.getTestResults = getTestResults;
        vm.selectTest = selectTest;

        (function () {
        }());

        function getTestResults(test) {
            if (test.FailCount > 0) {
                return 'failed-tests';
            } else {
                return 'passed-tests';
            }
        }

        function selectTest(test) {
            dataService.setTestCases(test.TestCases);
            $state.go('Test.TestSuite.TestCase');
        }
    }

}(angular, _));