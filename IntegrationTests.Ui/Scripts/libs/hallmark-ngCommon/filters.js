(function (angular) {
    'use strict';

    var mod = angular.module('hallmark.common.filters', []);

    mod.filter('htmlSafeContent', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        }
    }]);
}(angular));