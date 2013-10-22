"use strict";
app
.run(["$rootScope", function ($rootScope) {
    $rootScope.modal = {};
    $rootScope.cancelModal = function () {
        $rootScope.$broadcast("cancelModal");
    }
    $rootScope.$watch("modal", function (curr, prev) {
        for (var i in $rootScope.modal) {
            if (i !== "open" && $rootScope.modal[i] === true) {
                $rootScope.modal.open = true;
                return;
            }
        }
        $rootScope.modal.open = false;
    }, true)
}])
.directive('modal', [function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<section id="{{name}}-modal" class="reveal-modal" ng-class="{open: modal[name] }" ng-transclude></section>',
        link: function (scope, elem, attrs) {
            attrs.$observe('name', function () {
                scope.name = attrs.name;
            });
        }
    };
}])
.directive('modalBackground', ["$rootScope", function (rootscope) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="reveal-modal-bg" ng-class="{open: modal.open}" ng-click="cancelModal()"></div>',
        link: function (scope, elem, attrs) {
            // scope.cancelModal() see /Site/Config/Modal.js
        }
    }
}])
;