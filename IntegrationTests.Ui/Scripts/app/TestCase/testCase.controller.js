(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .controller('testCaseController', testCaseController);

    testCaseController.$inject = ['$state', 'dataService', 'suiteIndex', 'testIndex'];

    function testCaseController($state, dataService, suiteIndex, testIndex) {
        var vm = this;
        vm.testCases = dataService.getTestsCasesBySuiteAndTest(suiteIndex, testIndex);
        vm.getTestCaseResults = getTestCaseResults;

        (function () {
        }());

        function getTestCaseResults(testCase) {
            if (testCase.FailCount > 0) {
                return 'failed-tests';
            } else {
                return 'passed-tests';
            }
        }
    }

}(angular, _));