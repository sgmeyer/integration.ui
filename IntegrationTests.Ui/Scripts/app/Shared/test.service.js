(function(angular, _) {
    'use strict';

    angular.module('hallmark.integration-ui')
        .service('testService', testService);

    testService.$inject = ['$http', '$q'];

    function testService($http, $q) {
        var service = this;
        service.getLatest = getLatest;

        function getLatest() {
            return $http.get('/Home/LatestTestResult', function(response) {
                response = response.data[0].TestSuites;
                return response;
            }, function(error) {
                debugger;
                return $q.reject(response);
            });
        }
    }
}(angular, _));

/*var collectionName = '';
                for (var i = 0; i < response.TestSuites.length; i++) {

                    var testSuite = response.TestSuites[i];

                    var template =
                            '<div class="panel panel-primary">' +
                                '<div class="panel-heading" role="tab" id="heading' + i + '">' +
                                    '<h4 class="panel-title">' +
                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">' +
                                            testSuite.Name +
                                    '</a></h4></div>';

                    template += '<div id="collapse' + i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + i + '">';


                    for (var j = 0; j < testSuite.Tests.length; j++) {
                        var test = testSuite.Tests[j];


                        var passCount = test.PassCount;
                        var failCount = test.FailCount;


                        template +=
                                '<div class="panel panel-default">' +
                                    '<div class="panel-heading">' +
                                        test.Name +
                                        '<span class="badge badge-fail">' + failCount + '</span>' +
                                        '<span class="badge badge-pass">' + passCount + '</span>' +
                                    '</div>' +
                                    '<div class="panel-body">' +
                                        '<ul class="list-group">';

                        for (var k = 0; k < test.TestCases.length; k++) {
                            var testCase = test.TestCases[k];
                            var testCasePassCount = testCase.PassCount;
                            var testCaseFailCount = testCase.FailCount;

                            template +=
                            '<li class="list-group-item">' +
                                testCase.Name +
                                '<span class="badge badge-fail">' + testCaseFailCount + '</span>' +
                                '<span class="badge badge-pass">' + testCasePassCount + '</span>' +
                            '</li>';

                            for (var l = 0; l < testCase.Results.length; l++) {
                                var result = testCase.Results[l];
                                var resultName = result.Description;
                                var resultPass = result.Passed;
                            }
                        }

                        template += '</ul></div></div>';
                    }

                    template += '</div></div></div>';


                    $('#test-list').append(template);
                }

                $('#test-list caption').append(collectionName);*/