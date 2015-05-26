(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .controller('testCaseController', testCaseController);

    testCaseController.$inject = ['$state', 'testCases'];

    function testCaseController($state, testCases) {
        var vm = this;
        vm.testCases = testCases;
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