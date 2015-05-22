(function (angular, modernizr, _, hallmark) {
    'use strict';

    angular.module('hallmark.common.directives', [])
        .directive('numbersOnly', numbersOnly)
        .directive('numberStep', numberStep)
        .directive('scrollToTop', scrollToTop)
        .directive('hbcAutofocus', hbcAutofocus)
        .directive('metaEntityKey', metaEntityKey)
        .directive('ngModelOnblur', ngModelOnblur)
        .directive('select', select)
        .directive('updatePattern', updatePattern)
        .directive('match', match)
        .directive('clickAnywhereButHere', clickAnywhereButHere)
        .directive('popoverToggle', popoverToggle)
        .directive('popoverToggleText', popoverToggleText)
        .directive('hbcAssignOnChange', hbcAssignOnChange)
        .directive('modernizrSvg', modernizrSvg)
        .directive('categoryMenu', categoryMenu)
        .directive('customSelectBox', customSelectBox)
        .directive('datepickerPattern', datepickerPattern);

    numbersOnly.$inject = ['window'];

    function numbersOnly($window) {
        return {
            link: function (scope, element) {
                $(element[0]).on("keydown", function (evt) {
                    evt = $window.event || evt;
                    var charCode = evt.which || evt.keyCode;

                    if (charCode === 38 || charCode === 40) {
                        evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
                    }
                });
                $(element[0]).on("keypress", function (evt) {

                    evt = $window.event || evt;
                    var charCode = evt.which || evt.keyCode;

                    var len = $(this).val().length;
                    var dot = $(this).val().indexOf('.');

                    if (charCode === 48 && len === 0) {
                        evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
                    } else if (charCode === 46 && len === 0 || charCode === 46 && dot !== -1) {
                        evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
                    }

                    if ((charCode !== 46 || dot !== -1)
                        && (charCode < 48 || charCode > 57)
                        && charCode !== 9) {
                        evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
                    } else if ((dot !== -1) && ($(this).val().substring(dot, dot.length).length > 2)) {
                        evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
                    }

                });
            }
        };
    };

    function numberStep() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ngModel) {
                scope.stepValue = 0;

                //For DOM -> model validation
                ngModel.$parsers.unshift(function (value) {
                    var valid = scope.stepValue ? (ngModel.$viewValue % scope.stepValue === 0) : true;
                    ngModel.$setValidity('step', valid);
                    return valid ? value : undefined;
                });

                //For model -> DOM validation
                var setFormatter = function () {
                    ngModel.$formatters.unshift(function (value) {
                        ngModel.$setValidity('step', scope.stepValue ? (ngModel.$viewValue % scope.stepValue === 0) : true);
                        return value;
                    });
                };

                attr.$observe('numberStep', function (value) {
                    scope.stepValue = value;
                    setFormatter();
                });
            }
        };
    };

    scrollToTop.$inject = ['$window'];

    function scrollToTop($window) {
        return {
            link: function (scope, element, attr) {
                if (!attr.scrollToElement) {
                    console.log("`scroll-to-element` is required for this directive");
                    return;
                }

                $(element).hide();


                $(element).click(function () {
                    $("html, body").animate({ scrollTop: $('#' + attr.scrollToElement).offset().top }, "fast");
                });

                angular.element($window).bind("scroll", function () {
                    if ($(this).scrollTop() > 100) {
                        $(element).show();
                    } else {
                        $(element).hide();
                    }
                });
            }
        };
    };


    hbcAutofocus.$inject = ['$timeout'];

    function hbcAutofocus($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                scope.$watch(attr.hbcAutofocus, function (shouldFocus) {
                    $timeout(function () {
                        if (shouldFocus) {
                            element[0].focus();
                        }
                    });
                });

            }
        };
    };

    metaEntityKey.$inject = ['$rootScope'];

    function metaEntityKey($rootScope) {
        var head = angular.element(document.head);
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<meta name="Hbc-EntityKey" content="" />',
            link: function (scope, element, attr) {
                scope.entityKey = attr.content;
                $rootScope.entityKey = attr.content;
                head.append(element);
            }
        };
    };

    ngModelOnblur.$inject = ['$sniffer'];

    function ngModelOnblur($sniffer) {
        return {
            restrict: 'A',
            require: '?ngModel',
            priority: 99,
            link: function (scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox' || !ngModelCtrl) return;
                if ($sniffer.hasEvent('input')) {
                    elm.unbind('input');
                }
                if ($sniffer.hasEvent('change')) {
                    elm.unbind('change');
                }
                if ($sniffer.hasEvent('keydown')) {
                    elm.unbind('keydown');
                }
                elm.bind('blur', function () {
                    if (ngModelCtrl.$viewValue === elm.val()) {
                        return;
                    }

                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
                elm.bind("keydown keypress", function (event) {
                    var charCode = event.which || event.keyCode;
                    if (charCode === 13) { //enter key is 13
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(elm.val());
                        });
                    }
                });
            }
        };
    };

    function select() {
        return {
            restrict: 'E',
            require: '?ngModel',
            priority: 99,
            link: function (scope, elm, attr, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }
                elm.bind('blur', function () {
                    if (!ngModelCtrl) return;

                    if (ngModelCtrl.$viewValue === elm.val()) {
                        return;
                    }
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                    });
                });
            }
        };
    };

    function updatePattern() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                scope.$watch(attrs.ngPattern, function () {
                    if (ctrl.$viewValue && ctrl.$viewValue !== '') {
                        ctrl.$setViewValue(ctrl.$viewValue);
                    }
                });
            }
        };
    };

    function match() {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                match: '=',
                matchCaseSensitive: '=?'
            },
            link: function (scope, elem, attrs, ctrl) {
                var isMatch = true;

                scope.$watch(function () {
                    if (!scope.matchCaseSensitive && (typeof scope.match === 'string') && (typeof ctrl.$modelValue === 'string')) {
                        isMatch = scope.match.toUpperCase() === ctrl.$modelValue.toUpperCase();
                    } else {
                        isMatch = scope.match === ctrl.$modelValue;
                    }

                    return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || isMatch;
                }, function (currentValue) {
                    ctrl.$setValidity('match', currentValue);
                });
            }
        };
    };

    clickAnywhereButHere.$inject = ['$document', '$timeout', '$parse'];

    function clickAnywhereButHere($document, $timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                //Variable to track so action is only taken when binding changes.
                var lastActiveValue = false;
                //We need to know if the target is a function or a boolean.
                var isWatchingFunction = (function () {
                    var value = $parse(attr.clickAnywhereButHere)(scope);
                    return angular.isFunction(value);
                })();

                //if they clicked here do nothing. If they clicked anywhere else, toggle
                function handler(e) {
                    if (elem.has(e.target).length === 0) {
                        var model = $parse(attr.clickAnywhereButHere);
                        if (isWatchingFunction) {
                            var fn = model(scope);
                            fn(1); //Lets the target know a click happened.
                        } else
                            model.assign(scope, !model(scope)); //Just toggle the target boolean in the event of a boolean target.

                        $timeout(function () { scope.$apply(); });
                    }
                }

                //Manage the bindings based on if the directive is in a state where it should be
                //listening for clicks or not. Unbinding is done to suppress undesired events.
                //Uses mousedown because mousedown fires before click and blur.
                function bindings() {
                    var model = $parse(attr.clickAnywhereButHere);
                    var value = model(scope);

                    //The value can be a function to afford the user more control over 
                    //visibility.
                    if (isWatchingFunction)
                        value = value();

                    if (!angular.isUndefined(value) && lastActiveValue !== value) {
                        if (value)
                            $document.bind('mousedown', handler);
                        else
                            $document.unbind('mousedown', handler);

                        lastActiveValue = value;
                    }
                }

                //Watch enabled to respond accordingly.
                (function () {
                    var watch = attr.clickAnywhereButHere;
                    if (isWatchingFunction)
                        watch += "()"; //If function, make the watch call the function.

                    scope.$watch(watch, bindings);
                })();

                //Initialize.
                bindings();
            }
        };
    };

    function PopoverFitManagement() {
        var head = document.querySelector('head');
        //We want the orginal style so we know what the popover does by default.
        var popupStyleInfo = popupStyleInfo();
        var popupStyle = null;

        function popupStyleInfo() {
            var $div = $('<div class="popover"></div>');
            head.appendChild($div[0]);
            var result = {
                maxWidth: parseInt($div.css('max-width'))
            };

            head.removeChild($div[0]);

            return result;
        }

        function addStyle(styleText) {
            popupStyle = document.createElement('style');
            popupStyle.setAttribute("type", "text/css");
            head.appendChild(popupStyle);
            if (popupStyle.styleSheet) {
                popupStyle.styleSheet.cssText = styleText;
            } else {
                var textNode = document.createTextNode(styleText);
                popupStyle.appendChild(textNode);
            }
        }

        this.ensureFit = function (elem) {
            if (popupStyle) {
                head.removeChild(popupStyle);
                popupStyle = null;
            }

            var circledXSpace = 11; //The little circled X on the popover is 21 pixels wide. So this go to ⌈21*0.5⌉ = 11
            var bodyRect = document.body.getBoundingClientRect();
            var rect = elem[0].getBoundingClientRect();
            var width = rect.width || rect.right - rect.left;

            var center = width * 0.5 + rect.left;

            if (bodyRect.right - center < popupStyleInfo.maxWidth) { //left too close
                var newStyle = '.popover {max-width: ' + (parseInt(bodyRect.right - center) * 2 - circledXSpace) + 'px !important}';
                addStyle(newStyle);
            } else if (center < popupStyleInfo.maxWidth) { //right too close
                var newStyle = '.popover {max-width: ' + (parseInt(center) * 2) + 'px !important}';
                addStyle(newStyle);
            }
        }
    }

    var popoverFitManagement = new PopoverFitManagement();

    //Responsible for firing the event that the popover is listening for in order to trigger it to be visible.
    //This is a basic boolean version.
    popoverToggle.$inject = ['$timeout'];

    function popoverToggle($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                var isVisible = false;
                scope.$watch(attr.popoverToggle, function (value) {
                    //value could be undefined or null.
                    //undefined == false -> false (despite incorrect information on the Internet)
                    //Desired behavior for value is undefined or null is false, hence !!value
                    if (!!value != isVisible) {
                        $timeout(function () {
                            //popoverTrigger is something popover needs so it's just reused here.
                            if (value) {
                                popoverFitManagement.ensureFit(elem);
                            }
                            elem.trigger(attr.popoverTrigger);
                            isVisible = value;
                        });
                    }
                });
            }
        }
    };

    //Responsible for firing the event that the popover is listening for in order to trigger it 
    //to toggle visibility. Also ends up handling graceful updating of a popover when the text needs to change.
    popoverToggleText.$inject = ['$timeout'];

    function popoverToggleText($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                var isVisible = false;
                var defaultTimeout = 500; //Magic number gotten from transitionTimeoutin ui-bootstrap-tpls-0.11.0.js
                var hToggle = null;

                //Execs the toggle of the state of the visibility.
                function execToggle(wait) {
                    //cancel any previously set timeout this execution so there is only one pending.
                    if (hToggle) {
                        $timeout.cancel(hToggle);
                        hToggle = null;
                    }

                    hToggle = $timeout(function () {
                        //popoverTrigger is something popover needs so it's just reused here.
                        if (!isVisible) {
                            popoverFitManagement.ensureFit(elem);
                        }
                        elem.trigger(attr.popoverTrigger);
                        isVisible = !isVisible;
                    }, wait);

                    return hToggle;
                }

                //Updates the popover with the correct text.
                function setPopoverValue(value, wait) {
                    return $timeout(function () {
                        attr.$set('popover', value);
                    }, wait);
                }

                //Changes to the popoverToggleText attribute trigger the graceful updates
                //to the body of the popover.
                attr.$observe('popoverToggleText', function (value) {
                    //If the value isn't a new string, just return.
                    if (attr.popover === value)
                        return;

                    //If the new string is not the empty string
                    if (value) {
                        //check to see if the popover is currently visible. 
                        //If so, it must be hidden, text updated and then redisplayed 
                        //in order for everything to look all right.
                        if (isVisible) {
                            execToggle(0).then(function () {
                                setPopoverValue(value, 0);
                                execToggle(0);
                            });
                        }
                            //otherwise, if the popover is not visible, text updated and then redisplayed
                        else {
                            setPopoverValue(value, 0);
                            execToggle(0);
                        }
                    } else {
                        //empty string. Hide the popover visual and update the value at defaultTimeout.
                        execToggle(0).then(function () {
                            setPopoverValue(value, defaultTimeout);
                        });
                    }
                });
            }
        }
    };

    //Watches a programatic value and assigns it to another value on change.
    //Use case: When you want only one variable to control the visibility of something.
    hbcAssignOnChange.$inject = ['$parse'];

    function hbcAssignOnChange($parse) {
        return {
            restrict: 'A',
            link: function ($scope, $ele, $attr) {
                //If nothing to control, don't bother.
                if (!$attr.hbcAssignOnChange || !$attr.hbcAssignOnChangeWatchState)
                    return;

                //Watch on the validation state. 
                $scope.$watch($attr.hbcAssignOnChangeWatchState, function (newValue) {
                    var model = $parse($attr.hbcAssignOnChange);
                    model.assign($scope, newValue);
                });
            }
        }
    };

    function modernizrSvg() {
        if (modernizr.svg) {
            return {};
        }
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                attrs.$set('href', attrs.href.replace('svg', 'png'));
            }
        };
    };

    customSelectBox.$inject = ['$window'];

    function customSelectBox($window) {
        return {
            restrict: 'C',
            link: function (scope, element) {
                if ($window.Browser.IsIe() && $window.Browser.Version() <= 10) {
                    element.removeClass("custom-select-box full-width")
                        .attr("style", "width:100%")
                        .find("select")
                        .removeClass("form-control")
                        .attr("style", "width:100%");
                }
            }
        };
    }

    categoryMenu.$inject = ['$analytics'];
    function categoryMenu($analytics) {
        return {
            restrict: 'A',
            replace: 'true',
            templateUrl: 'templates/hbcCategoryList.html',
            transclude: true,
            scope: {
                list: '=categoryMenu',
                filter: '=',
                search: '=',
                page: '=',
                pageSize: '@',
                hasSearch: '@',
                searchPlaceholder: '@',
                searchAnalyticsEvent: '@'
            },
            link: link
        };

        function link($scope, $element, $attrs) {
            if (!$attrs.pageSize) { requiredError('page-size'); return; }
            if (!$attrs.page) { requiredError('page'); return; }
            if (!$attrs.filter) { requiredError('filter'); return; }
            if (!$attrs.hasSearch) { requiredError('has-search'); return; }
            if ($attrs.hasSearch && $attrs.hasSearch === true && !$attrs.search) { requiredError('search'); return; }

            var persistedFilter = '';
            $scope.setFilter = setFilter;
            $scope.setSearch = setSearch;
            $scope.push = push;
            $scope.pop = pop;
            $attrs.$observe('defaultFilter', function (defaultFilter) {
                $scope.setFilter(defaultFilter);
            });

            function setFilter(filterBy) {
                $scope.page = $scope.pageSize;
                if (!hallmark.Helpers.isStringBlank($scope.search)) {
                    $scope.search = '';
                    $('.js-search-box').val('');//Needed because of nesting scopes, could use $scope.$childHead.search but this seems cleaner
                }
                $scope.filter = filterBy;
                persistedFilter = filterBy;
            };

            function setSearch(searchBy) {
                $scope.page = $scope.pageSize;
                $scope.search = searchBy;
                if (hallmark.Helpers.isStringBlank($scope.search) && $scope.filter === undefined) {
                    $scope.filter = persistedFilter;
                } else if (!hallmark.Helpers.isStringBlank($scope.search) && $scope.filter !== undefined) {
                    $scope.filter = undefined;
                }

                if ($attrs.searchAnalyticsEvent) {
                    $analytics.eventTrack($attrs.searchAnalyticsEvent, {
                        category: $attrs.searchAnalyticsEvent,
                        label: $scope.search
                    });
                }
            };

            function pop() {
                var shiftedCategory = $scope.list.shift();
                $scope.list.push(shiftedCategory);
            };

            function push() {
                var value = $scope.list.pop();
                var arrayHolder = angular.copy($scope.list);
                arrayHolder.splice(0, 0, angular.copy(value));
                $scope.list = [];
                _.each(arrayHolder, function (arrayValue, index) {
                    $scope.list.push(arrayValue);
                });
            };
            function requiredError(attributeName) {
                console.log('Required: ' + attributeName + ' is a required attribute');
            }
        }
    }

    function datepickerPattern() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModelCtrl) {
                var dRegex = new RegExp(attrs.datepickerPattern);
                ngModelCtrl.$parsers.unshift(function (value) {

                    if (typeof value === 'string') {
                        if (value != '') {
                            var isValid = dRegex.test(value);
                            ngModelCtrl.$setValidity('datePicker', isValid);
                            if (!isValid) {
                                return undefined;
                            }
                        }
                    }
                    return value;
                });

            }
        };
    };

}(angular, Modernizr, _, Hallmark));