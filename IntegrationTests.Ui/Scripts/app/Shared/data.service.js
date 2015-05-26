(function (angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .service('dataService', dataService);

    dataService.$inject = [];

    function dataService() {
        var storage = this;
        storage.tests = {};
        storage.testCases = {};

        storage.setTests = setTests;
        storage.getTests = getTests;
        storage.setTestCases = setTestCases;
        storage.getTestCases = getTestCases;

        function getTests() {
            return storage.tests;
        }

        function setTests(tests) {
            storage.tests = tests;
        }

        function getTestCases() {
            return storage.testCases;
        }

        function setTestCases(testCases) {
            storage.testCases = testCases;
        }
    }
}(angular, _));