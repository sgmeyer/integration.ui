(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .controller('allTestsController', allTestsController);

    allTestsController.$inject = ['$state', 'testService', 'dataService'];

    function allTestsController($state, testService, dataService) {
        var vm = this;
        vm.testSuites = [];
        vm.getTestResults = getTestResults;
        vm.getTestStatusCount = getTestStatusCount;
        vm.selectTestSuite = selectTestSuite;

        (function() {
            testService.getTestSuites().then(function (testSuites) {
                dataService.setTestSuites(testSuites);
                vm.testSuites = testSuites;
            });
        }());

        function getTestResults(testSuite) {
            var every = _.every(testSuite.Tests, function(tests) {
                return tests.FailCount === 0;
            });
            if (!every) {
                return 'failed-tests';
            } else {
                return 'passed-tests';
            }
        };

        function getTestStatusCount(passed, testSuite) {
            if (passed) {
                var passedTests = 0;
                _.each(testSuite.Tests, function(tests) {
                    passedTests += parseInt(tests.PassCount);
                });
                return passedTests;
            } else {
                var failedTests = 0;
                _.each(testSuite.Tests, function(tests) {
                    failedTests += parseInt(tests.FailCount);
                });
                return failedTests;
            }
        }

        function selectTestSuite(index) {
            $state.go('Test.TestSuite', { suiteIndex: index });
        };
    }
}(angular, _));