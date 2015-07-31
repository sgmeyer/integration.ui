(function (angular, _) {

    angular
        .module('hallmark.integration-ui')
        .service('testsFlowService', testsFlowService);

    testsFlowService.$inject = ['dataService'];

    function testsFlowService(dataService) {
        var that = this;
        that.isAllowedToViewTests = isAllowedToViewTests;
        that.isAllowedToViewTestCases = isAllowedToViewTestCases;

        function isAllowedToViewTests(toParams) {
            if (toParams['suiteIndex'] === undefined) {
                return false;
            }
            var tests = dataService.getTestsBySuiteIndex(toParams['suiteIndex']);
            return tests && !angular.equals({}, tests);
        };

        function isAllowedToViewTestCases(toParams) {
            if (!isAllowedToViewTests(toParams) && toParams['testIndex'] === undefined) {
                return false;
            }
            var testCases = dataService.getTestsCasesBySuiteAndTest(toParams['suiteIndex'], toParams['testIndex']);
            return testCases && !angular.equals({}, testCases);
        };
    }

})(angular, _);