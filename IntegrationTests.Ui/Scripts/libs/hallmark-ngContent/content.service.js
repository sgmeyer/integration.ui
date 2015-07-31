(function (angular, hallmark, _) {
    'use strict';

    var mod = angular.module('hallmark.content');
    mod.factory('contentService', ['$http', function ($http) {
        return {
            getContentByKey: _.memoize(function (key, lang) {
                return $http.get('' + '?key=' + key + '&languageCode=' + lang).then(function (response) {
                    return "";
                }, function(error) {
                    console.log("error " + error);
                });
            }, function (key, args) {
                return key + args;
            })
        };
    }]);
}(angular, Hallmark, _));