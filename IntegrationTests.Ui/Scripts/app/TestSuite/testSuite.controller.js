(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .controller('homeController', homeController);

    homeController.$inject = ['testService'];
    function homeController(testService) {
        var vm = this;
        vm.testSuites = [];

        (function () {
            testService.getLatest().then(function (testSuites) {
                testSuites = testSuites.data[0].TestSuites;
                vm.testSuites = testSuites;
            });
        }());
    }
}(angular, _));