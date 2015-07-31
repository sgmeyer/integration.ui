(function (angular) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .service('dataService', dataService);

    dataService.$inject = [];

    function dataService() {
        var storage = this;
        storage.testSuites = {};
  
        storage.setTestSuites = setTestSuites;
        storage.getTestsBySuiteIndex = getTestsBySuiteIndex;
        storage.getTestsCasesBySuiteAndTest = getTestsCasesBySuiteAndTest;
        
        function setTestSuites(testSuites) {
            storage.testSuites = testSuites;
        }

        function getTestsBySuiteIndex(index) {
            return storage.testSuites[index].Tests;
        }

        function getTestsCasesBySuiteAndTest(suiteIndex, testIndex) {
            return storage.testSuites[suiteIndex].Tests[testIndex].TestCases;
        } 
    }
}(angular));