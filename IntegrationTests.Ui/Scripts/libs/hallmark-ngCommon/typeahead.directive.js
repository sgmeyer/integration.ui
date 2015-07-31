(function (angular) {
    'use strict';    

    angular.module('hallmark.common')
    .directive("hallmarkTypeahead", hallmarkTypeahead)
    .directive("hallmarkRecipientSearch", hallmarkRecipientSearch);    

    hallmarkTypeahead.$inject = ['$parse', '$timeout', '$debounceService', '$templateCache', '$compile'];
    function hallmarkTypeahead($parse, $timeout, $debounceService, $templateCache, $compile) {
        return {
            restrict: 'EA',
            transclude: true,
            link: function ($originalScope, $element, $attrs, $ctrl, $transclude) {
                var $setModelValue = $parse($attrs.ngModel).assign;                                
                var refreshListFn = $originalScope.$eval($attrs.refreshListFn);
                if (!refreshListFn) {
                    throw new Error('refreshListFn attribute is required');
                }

                var selectItemFn = $originalScope.$eval($attrs.selectItemFn);
                if (!selectItemFn) {
                    throw new Error('selectItemFn attribute is required');
                }

                var debounceTime = $originalScope.$eval($attrs.debounceTime);
                $originalScope.$on('$destroy', function () {
                    $scope.$destroy();
                });

                var $scope = $originalScope.$new();
                $scope.template = $attrs.template;
                $scope.placeholderTextFn = $parse($attrs.placeholderTextFn);
                if (!$scope.placeholderTextFn) {
                    throw new Error('placeholderTextFn attribute is required');
                }                

                $scope.items = [];
                $scope.searching = false;
                $scope.selectedItem = null                
                
                var debounce = $debounceService.alloc(debounceTime, function () {
                    refreshListFn($scope.selectedItem, function (items) {
                        $scope.searching = false;
                        $scope.items = items;
                        typeaheadModel.$setViewValue($scope.selectedItem);
                    }, function () {
                        $scope.searching = false;
                    });
                });

                $scope.$watch('selectedItem', function () {
                    if (angular.isObject($scope.selectedItem)) {
                        debounce.cleanUp();
                        selectItemFn($scope.selectedItem);
                        $scope.selectedItem = null;
                    } else if ($scope.selectedItem) {
                        $scope.searching = true;
                        debounce.exec();
                    }
                });                

                var html = $templateCache.get('libs/hallmark-ngCommon/typeahead.html');                
                var typeahead = $compile(html)($scope);
                var typeaheadModel = typeahead.find('[data-typeahead]').controller('ngModel');
                typeahead.find(".replace-me").replaceWith($transclude());
                $element.replaceWith(typeahead);
            }
        };
    }

    hallmarkRecipientSearch.$inject = ['$parse', '$recipientSelect', 'contentService', '$templateCache', '$compile'];
    function hallmarkRecipientSearch($parse, $recipientSelect, contentService, $templateCache, $compile) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function ($originalScope, $element, $attrs, $ctrl) {               
                var $setModelValue = $parse($attrs.ngModel).assign;
                var whoIsMakingItHappen = '';
                var anyoneElse = '';

                var $scope = $originalScope.$new();
                $originalScope.$on('$destroy', function () {
                    $scope.$destroy();
                });

                $scope.selectedRecipients = $recipientSelect.get;                
                $scope.refreshList = $recipientSelect.refreshList;
                $scope.remove = remove;
                $scope.selectItem = add;                

                function updateModel() {
                    var selectedItems = $recipientSelect.get();
                    $ctrl.$setViewValue(selectedItems);
                    $setModelValue($originalScope, selectedItems);
                }

                function remove(item) {
                    $recipientSelect.remove(item);
                    updateModel();
                }

                function add(item) {
                    $recipientSelect.add(item);
                    updateModel();
                }

                contentService.getContentByKey("Iris.Order.Recipient.Typeahead.Placeholder", "en").then(function (data) {
                    whoIsMakingItHappen = data.text;
                });

                contentService.getContentByKey("Iris.Order.Recipient.Typeahead.Placeholder.More", "en").then(function (data) {
                    anyoneElse = data.text;
                });

                $scope.placeholderText = function () {
                    return $recipientSelect.length() === 0 ? whoIsMakingItHappen : anyoneElse;
                };

                $ctrl.$parsers.unshift(function (value) {
                    $ctrl.$setValidity('atLeastOneSelected', $recipientSelect.length() > 0);
                });

                var html = $templateCache.get('libs/hallmark-ngCommon/typeahead-recipient-search.html');
                var typeahead = $compile(html)($scope);
                $element.replaceWith(typeahead);
            }
        };
    }

    angular.module("hallmark.common")
        .run(["$templateCache", function ($templateCache) {
            $templateCache.put("libs/hallmark-ngCommon/typeahead.html",
                "<div class=\"input-group hallmark-typeahead\">\n" +
                "	<input class=\"form-control\"\n" +
                "		   placeholder=\"{{placeholderTextFn()}}\"\n" +
                "		   data-ng-model=\"selectedItem\"\n" +
                "		   data-typeahead=\"item for item in items\"\n" +
                "		   data-typeahead-template-url=\"{{template}}\" />\n" +
                "	<div class=\"input-group-addon hidden\" data-ng-class=\"{hidden: !searching}\">\n" +
                "		<i class=\"fa fa-spinner fa-spin\"></i>\n" +
                "	</div>\n" +
                "   <div class=\"replace-me\"></div>\n" +
                "</div>");

            $templateCache.put("libs/hallmark-ngCommon/typeahead-recipient-search.html",
                "<div class=\"form-group\">\n" +
                "	<div data-hallmark-typeahead\n" +
                "        data-template=\"libs/hallmark-ngCommon/recpientSearchItem.html\"\n" +
                "        data-placeholder-text-fn=\"placeholderText\"\n" +
                "        data-refresh-list-fn=\"refreshList\"\n" +
                "        data-select-item-fn=\"selectItem\">\n" +
                "           <div class=\"input-group-addon\">\n" +
                "		    <i class=\"fa fa-user\"></i>\n" +
                "	    </div>\n" +
                "   </div>\n" +
                "</div>\n" +
                "<div class=\"form-group\">\n" +
                "	<div data-ng-repeat=\"recipient in selectedRecipients()\" class=\"input-group\">\n" +
                "		<span class=\"form-control recipient-name\">\n" +
                "			{{recipient.fullName}}\n" +
                "		</span>\n" +
                "		<span class=\"recipient-delete input-group-addon js-clickable\" data-ng-click=\"remove(recipient)\">\n" +
                "			<i class=\"fa fa-times\"></i>\n" +
                "		</span>\n" +
                "	</div>\n" +
                "</div>\n");

            $templateCache.put("libs/hallmark-ngCommon/recpientSearchItem.html",
                "<a>" +
                "  <p>{{match.model.fullName}}</p>" +
                "  <div class=\"text-sm text-font-secondary details\">" +
                "      <span data-ng-bind=\"match.model.city\"></span>" +
                "      <span class=\"spacer\">|</span>" +
                "      <span data-ng-bind=\"match.model.department\"></span>" +
                "  </div>" +
                "</a>");
        }]);        
})(angular);