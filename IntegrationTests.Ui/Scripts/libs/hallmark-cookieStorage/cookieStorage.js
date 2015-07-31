(function (angular, hallmark) {
    'use strict';
    angular
        .module('CookieStorageModule', [])
        .service('cookieStorageService', cookieStorageService);
    cookieStorageService.$inject = ['$document'];

    function cookieStorageService($document) {
        return {
            getCookie: function (cname) {

                var envSafeCookieName = hallmark.config.common.cookieName;
                envSafeCookieName = envSafeCookieName.replace("{0}", cname);

                var name = envSafeCookieName + '=';
                var ca = $document.prop('cookie').split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
                return "";
            },

            setCookie: function (cname, cvalue, exdays, domain) {

                if (!cname || !cvalue) {
                    return;
                }
                var expires = "";
                if (exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    expires = 'expires=' + d.toUTCString();
                }

                var envSafeCookieName = hallmark.config.common.cookieName;
                envSafeCookieName = envSafeCookieName.replace("{0}", cname);
                var cookie = envSafeCookieName + '=' + cvalue + '; ' + expires;
                if (domain) {
                    cookie += '; domain=' + domain;
                }

                $document.prop('cookie', cookie);
            },

            saveObjectToCookie: function (cname, obj, exdays, domain) {
                var serialzedString = angular.toJson(obj);
                this.setCookie(cname, serialzedString, exdays, domain);
            },

            getObjectFromCookie: function (cname) {
                var cookieString = this.getCookie(cname);
                if (cookieString) {
                    return angular.fromJson(cookieString);
                }
                return null;
            }
        };
    }
}(angular, Hallmark));