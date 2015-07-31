(function (angular) {
    'use strict';

    var mod = angular.module('hallmark.content');
    mod.directive('content', ['contentService', function (contentService) {
        return {
            restrict: 'E',
            scope: true,
            link: function (scope, element, attrs) {
                attrs.$observe('lang', function (lang) {
                    element.hide();
                    contentService.getContentByKey(attrs.key, lang).then(function (content) {
                        var val = '';
                        if (content) {
                            val = content.text || val;
                        }

                        element.replaceWith(val);
                    }).then(function () {
                        element.show('slow');
                    });
                });
            }
        };
    }]);
}(angular));