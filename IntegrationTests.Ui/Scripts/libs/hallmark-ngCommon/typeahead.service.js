(function (angular, hallmark) {
    'use strict';
    Object.keys = Object.keys || function (obj) {
        var result = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key);
            }
        }

        return result;
    };

    angular.module('hallmark.common')
        .service('$recipientSelect', recipientSelect)
        .service('$debounceService', debounceService);

    debounceService.$inject = ['$timeout'];
    function debounceService($timeout) {
        this.alloc = alloc;

        function alloc(debounceTime, callback) {
            function Debounce() {
                var that = this;
                var promise = null;
                this.cleanUp = cleanUp;
                this.exec = exec;

                debounceTime = debounceTime || 175;

                function cleanUp() {
                    if (promise) {
                        $timeout.cancel(promise);
                        promise = null;
                    }
                }

                function exec() {
                    that.cleanUp();
                    promise = $timeout(function () {
                        callback();
                        promise = null;
                    }, debounceTime);
                }
            }

            return new Debounce();
        }
    };

    recipientSelect.$inject = ['$http', 'cookieStorageService'];
    function recipientSelect($http, cookieStorageService) {
        var selectedRecipients = {};
            
        this.get = get;
        this.add = add;            
        this.remove = remove;
        this.length = length;
        this.refreshList = refreshList;

        function get() {
            return selectedRecipients;
        }

        function add(item) {
            selectedRecipients[item.id] = item;
        }

        function remove(item) {
            delete selectedRecipients[item.id];
        }

        function length() {
            return Object.keys(selectedRecipients).length;
        }

        function getActorIdToIgnore() {
            var token = cookieStorageService.getCookie("Token");
            if (token) {
                token = JSON.parse(token);
                return token.actorId;
            } else {
                return 0;
            }
        }

        function refreshList(value, success, error) {
            function RecipientSearchResult(item) {
                var that = this;
                this.fullName = item.fullName;
                this.city = item.customFieldSearchValues.city;
                this.department = item.customFieldSearchValues['department Name'];
                this.id = item.recipientId;
                this.toString = function () {
                    return that.fullName;
                }
            }            

            return $http.get(hallmark.config.recipientSearch.url + '/?fullName=[' + value + ']&actorIdsToIgnore=' + getActorIdToIgnore() + '&skip=0&take=10').success(function (data) {
                var results = [];
                angular.forEach(data, function (item) {
                    results.push(new RecipientSearchResult(item));
                });

                success(results);
            }).error(error);
        }       
    }
})(angular, Hallmark);