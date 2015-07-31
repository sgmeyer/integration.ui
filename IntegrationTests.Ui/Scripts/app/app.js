(function (angular) {
    'use strict';

    var dependencies = [
        'ui.router',
        'hallmark.common',
        'ngAnimate'
    ];

    angular
        .module('hallmark.integration-ui', dependencies)
        .run(run);

    run.$injector = ['$rootScope', '$state', 'testsFlowService'];
    
    function run($rootScope, $state, testsFlowService) {
        $rootScope.hideBanner = true;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var nextState = toState.name;
            var previousState = (fromState && fromState.name) ? fromState.name : 'Test';

            if (nextState === 'Test.TestSuite' && !testsFlowService.isAllowedToViewTests(toParams)) {
                event.preventDefault();
                $state.go(previousState);
            } else if (nextState === 'Test.TestSuite.TestCase' && !testsFlowService.isAllowedToViewTestCases(toParams)) {
                event.preventDefault();
                $state.go(previousState);
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            
        });
    }
})(angular);