(function(angular, _) {
    'use strict';

    angular.module('hallmark.common')
        .directive('button', buttonSubmitClick)
        .directive('form', formSubmitted)
        .directive('ngForm', formSubmitted)
        .directive('formGroup', formGroupValidation)
        .directive('hbcInputContainer', formGroupValidation)
        .directive('validationTypes', customInputValidation);

    function buttonSubmitClick() {
        return {
            restrict: 'E',
            require: ['^?form', '^^?form'],
            link: function(scope, elem, attrs, forms) {
                if (!attrs.hbcSubmit) {
                    return;
                }
                if (!forms[0]) {
                    console.log("All hbc submit buttons should have an ngForm parent");
                    return;
                }

                elem.on('click', function() {
                    scope.$emit('submitForm', true);
                });
            }
        };
    };

    function ngFormNotStandard() {
        return {
            restrict: 'A',
            link: function() {
                console.log("Please use <form> over ng-form as our validation requires it");
            }
        }
    };

    formSubmitted.$inject = [];

    function formSubmitted() {
        return {
            restrict: 'EA',
            link: function(scope, elem, attrs) {
                if (!attrs.name || attrs.parentForm) {
                    return;
                }

                scope.$on('submitForm', function($event, value) {
                    scope[attrs.name].$submitted = value;
                    //Force a digest because we are finished with the current iteration
                    scope.$digest();
                    var firstError = $("body").find("input.ng-invalid")[0];
                    var $firstError = $(firstError);
                    if (firstError) {
                        var navOffset = $('nav').height();
                        $("html, body").animate({ scrollTop: $firstError.offset().top - navOffset }, "fast");
                        firstError.focus();
                    }
                });
            }
        }
    };

    formGroupValidation.$inject = [];

    function formGroupValidation() {
        return {
            restrict: 'AC',
            require: '^?form',
            link: function(scope, elem, attrs, formController) {
                if (!attrs.formInput || !formController) {
                    return;
                }

                scope.$on('submitForm', function($event, value) {
                    if (value && formController[attrs.formInput].$invalid) {
                        elem.addClass('has-error');
                    }
                });
            }
        }
    };

    customInputValidation.$inject = ['$compile'];

    function customInputValidation($compile) {
        return {
            restrict: 'A',
            transclude: true,
            require: ['^?form', 'ngModel'],
            link: function(scope, elem, attrs, controllers) {
                if (!attrs.validationTypes) {
                    return;
                }
                var validationTypes = attrs.validationTypes.replace(/\s/g, "").split(',');
                var formController = controllers[0], modelController = controllers[1];
                if (!formController) {
                    return;
                }

                var formName = formController.$name;
                var mainForm = elem[0].form;
                if (mainForm) {
                    formName = mainForm.name ? mainForm.name : $(mainForm).attr("data-name");
                }

                var errors = [];
                _.each(validationTypes, function(validationType) {
                    var validationError = attrs[validationType + 'Error'];
                    if (validationError === undefined) {
                        console.log("`data-" + validationType + "-error` is required when `data-validation-types` is defined on " + $(elem).attr('name'));
                        return;
                    }

                    var errorTemplate = "<span class='field-validation-error' data-ng-if='" + formName + ".$submitted && " + formController.$name + "." + modelController.$name + ".$error." + validationType + "'>" + validationError + "</span>";
                    errors.push($compile(errorTemplate)(scope));
                });

                var parent;
                if (elem.parent().hasClass('form-group')) {
                    parent = elem.parent();
                } else {
                    parent = elem.parent().parent();
                }
                if (parent) {
                    parent.append(errors);
                }
            }
        }
    };
}(angular, _));