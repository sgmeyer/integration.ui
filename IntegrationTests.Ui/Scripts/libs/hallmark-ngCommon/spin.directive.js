(function (angular) {
    'use strict';

    angular.module('hallmark.common')
        .directive('faSpin', faSpin);

    faSpin.$inject = ['$interval', '$window'];

    function faSpin($interval, $window) {
        return {
            restrict: 'C',
            link: function (scope, element, attr) {
                if ($window.Browser.IsIe() && $window.Browser.Version() < 9) {
                    var rotation = 0;
                    var spinning;
                    scope.$watch(function () {
                        return element.hasClass('ng-hide');
                    }, function (isHidden) {
                        if (isHidden) {
                            $interval.cancel(spinning);
                        } else {
                            spinning = $interval(spinLoop, 500);
                        }

                        function spinLoop() {
                            rotation += 45;
                            if (rotation > 360) {
                                rotation = 0;
                            }
                            var c = Math.cos(rotation),
                                s = Math.sin(rotation);
                            element.css('filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + c + ",M12=" + (-s) + ",M21=" + s + ",M22=" + c + ",SizingMethod='auto expand')");
                        }
                    });
                }
            }
        }
    }
}(angular));