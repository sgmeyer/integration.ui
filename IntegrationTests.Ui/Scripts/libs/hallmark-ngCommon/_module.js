(function (angular, global) {
    'use strict';

    global.console = global.console || {log: function() {} };

    angular.module('hallmark.common', [
            'ui.bootstrap',
            'CookieStorageModule',
            'hallmark.content'
    ]);
}(angular, typeof window === 'undefined' ? this : window));