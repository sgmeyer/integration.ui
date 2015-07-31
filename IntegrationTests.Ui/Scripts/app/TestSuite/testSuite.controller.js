(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .controller('testSuiteController', testSuiteController);

    testSuiteController.$inject = ['$state', 'dataService', 'suiteIndex'];

    function testSuiteController($state, dataService, suiteIndex) {
        var vm = this;
        vm.tests = dataService.getTestsBySuiteIndex(suiteIndex);
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

        function selectTest(testIndex) {
            $state.go('Test.TestSuite.TestCase', { suiteIndex: suiteIndex, testIndex: testIndex });
        }
    }

}(angular, _));