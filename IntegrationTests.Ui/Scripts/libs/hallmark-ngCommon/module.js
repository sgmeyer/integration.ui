(function (angular, global) {
    'use strict';

    global.console = global.console || {log: function() {} };

    angular.module('hallmark.common', [
        'hallmark.common.directives',
        'hallmark.common.formDirectives',
        'hallmark.common.filters',
        'hallmark.common.interceptors',
        'hallmark.common.templates'
    ]);
}(angular, typeof window === 'undefined' ? this : window));