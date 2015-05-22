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

    run.$injector = ['$rootScope', '$state'];
    
    function run($rootScope, $state) {
        $rootScope.hideBanner = true;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            
        });
    }
})(angular);