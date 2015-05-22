(function (angular) {
    'use strict';

    var mod = angular.module("hallmark.common.templates", []);

    mod.run(["$templateCache", function ($templateCache) {
        $templateCache
            .put("templates/hbcPopover.html",
                "<div class=\"popover {{placement}}\" data-ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
                "  <div class=\"arrow\"></div>\n" +
                "\n" +
                "  <div class=\"popover-inner\">\n" +
                "      <h3 class=\"popover-title\" data-ng-bind-html=\"title | htmlSafeContent\" data-ng-show=\"title\"></h3>\n" +
                "      <div class=\"popover-content\"data-ng-bind-html=\"content | htmlSafeContent\"></div>\n" +
                "      <a class=\"close\" style=\"position: absolute; top: -8px; right: -8px;\"><i class=\"fa fa-times-circle-o\"></i></a>\n" +
                "  </div>\n" +
                "</div>\n" +
                "")
        $templateCache.put("templates/hbcCategoryList.html",
                "<div class=\"row row-fixed-top hbc-category-menu\">\n" +
                        "<div class=\"container no-bg\">\n" +
                            "<div class=\"row\" " +
                                  "data-ng-class=\"{\'hidden-sm hidden-xs\': showMobileSearch && hasSearch === \'true\', " +
                                                   "\'col-md-9 col-xs-11\': hasSearch === \'true\'}\">\n" +
                                "<span class=\"col-xs-1 fa fa-arrow-left js-clickable\" data-ng-click=\"push()\"></span>\n" +
                                "<div class=\"col-xs-10 category-container\">\n" +
                                    "<ul class=\"nav nav-pills hbc-pills\">\n" +
                                        "<li data-ng-class=\"{active: filter === item.name}\"\n" +
                                                "data-ng-repeat=\"item in list\"\n" +
                                                "class=\"category\">\n" +
                                                    "<a href=\"\"\n" +
                                                        "data-ng-click=\"setFilter(item.name)\"\n" +
                                                        "data-category-click=\"\"\n" +
                                                        "data-ng-bind=\"item.label\"\n" +
                                                        "data-ng-cloak=\"true\"\n" +
                                                        "data-analytics-on\n" +
                                                        "data-analytics-category=\"Merchant Search - Category\">" +
                                                    "</a>\n" +
                                         "</li>\n" +
                                    "</ul>\n" +
                                "</div>\n" +
                                "<span class=\"col-xs-1 fa fa-arrow-right js-clickable\" data-ng-click=\"pop()\"></span>\n" +
                            "</div>\n" +
                            //desktop view search
                            "<div data-ng-if=\"hasSearch  === \'true\'\" class=\"col-md-3 hidden-sm hidden-xs\">\n" +
                                "<div class=\"input-group\">\n" +
                                    "<input type=\"text\"\n" +
                                            "data-ng-model=\"search\"\n" +
                                            "data-ng-change=\"setSearch(search)\"\n" +
                                            "class=\"form-control js-search-box\"\n" +
                                            "placeholder=\"{{searchPlaceholder}}\" />\n" +
                                    "<span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n" +
                                "</div>\n" +
                            "</div>\n" +
                            // mobile view
                            "<div data-ng-show=\"hasSearch  === \'true\' && showMobileSearch\" class=\"hidden-lg hidden-md col-xs-12\">\n" +
                                "<div class=\"input-group\">\n" +
                                    "<input type=\"text\"\n" +
                                           "data-ng-model=\"search\"\n" +
                                           "data-ng-change=\"setSearch(search)\"\n" +
                                           "class=\"form-control js-search-box\"\n" +
                                           "placeholder=\"{{searchPlaceholder}}\" />\n" +
                                    "<span class=\"input-group-addon js-clickable\" data-ng-click=\"showMobileSearch = !showMobileSearch\"><i class=\"fa fa-times-circle\"></i></span>\n" +
                                "</div>\n" +
                            "</div>\n" +
                            "<div data-ng-show=\"hasSearch  === \'true\' && !showMobileSearch\" class=\"hidden-lg hidden-md col-xs-1\">\n" +
                                "<span class=\"mock-group-addon js-clickable\" data-ng-click=\"showMobileSearch = !showMobileSearch\"><i class=\"fa fa-search\"></i></span>\n" +
                            "</div>\n" +
                        "</div>\n" +
                    "</div>\n" +
                    "");
    }]);
}(angular));

