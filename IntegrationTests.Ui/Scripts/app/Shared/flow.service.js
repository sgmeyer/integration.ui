(function (angular) {

    angular
        .module('hallmark.integration-ui')
        .service('testsFlowService', testsFlowService);

    testsFlowService.$inject = ['dataService'];

    function testsFlowService(dataService) {
        var that = this;
        that.isAllowedToViewTests = isAllowedToViewTests;
        that.isAllowedToViewTestCases = isAllowedToViewTestCases;

        function isAllowedToViewTests() {
            var tests = dataService.getTests();
            return tests && !angular.equals({}, tests);
        };

        function isAllowedToViewTestCases() {
            if (!isAllowedToViewTests) {
                return false;
            }
            var testCases = dataService.getTestCases();
            return testCases && !angular.equals({}, testCases);
        };
    }

})(angular);