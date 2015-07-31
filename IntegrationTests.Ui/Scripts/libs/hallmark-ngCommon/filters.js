(function(angular) {
    'use strict';

    angular.module('hallmark.common')
        .filter('htmlSafeContent', htmlSafeContent);

    htmlSafeContent.$inject = ['$sce'];

    function htmlSafeContent($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        }
    };

}(angular));