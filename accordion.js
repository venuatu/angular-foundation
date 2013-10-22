"use strict";
app
.directive("accordion", [function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: "<div class='section-container accordion' ng-transclude></div>",
        link: function (scope, elem, attrs) {
        }
    };
}])
.directive("accordionItem", [function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: { title: "@" },
        template:   "<section ng-class=\"{'active': !closed }\">" +
                        "<p class='title' data-section-title ng-click='closed = !closed'><a>{{ title }}</a></p>" +
                        "<div class='content' data-section-content ng-transclude></div>" +
                    "</section>",
        link: function (scope, elem, attrs) {
            scope.title = attrs.title;
            scope.closed = false;
            if (attrs.defaultClosed !== undefined) {
                scope.closed = true;
            }
        }
    };
}])
;