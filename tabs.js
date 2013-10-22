"use strict";
app
.directive('tabContainer', [function () {
    return {
        restrict: 'E',
        controller: ["$scope", function (scope) { }],// Use an empty controller to share functions
        replace: true,
        transclude: true,
        template: "<div class='section-container auto' data-section data-section-resized ng-transclude></div>",
        scope: false,
        link: function (scope, elem, attrs, ctrl) {
            window.tcon = arguments;
            ctrl.titleChange = function () {
                var prevPixels = 0, maxHeight = 0;
                angular.forEach(elem[0].querySelectorAll('.section-container.auto > section > p.title'), function (v, k) {
                    var $v = angular.element(v);
                    v.style.left = prevPixels + 'px';
                    prevPixels += v.offsetWidth;
                    if (v.offsetHeight > maxHeight)
                        maxHeight = v.offsetHeight;
                });
                angular.element(elem[0].querySelectorAll('.section-container.auto > section > p.title')).css({ height: maxHeight + 'px' });
                angular.forEach(elem[0].children, function (v) {
                    if (/section/i.test(v.tagName))
                        v.style.paddingTop =  maxHeight + 'px';
                    console.log(v.tagName);  
                });
                if (elem[0].querySelectorAll('.section-container.auto > section.active').length === 0) {
                    angular.element(elem[0].querySelector('.section-container.auto > section')).addClass('active');
                    console.log('set active ', elem[0].querySelector('.section-container.auto > section'));
                }
                console.log(prevPixels, maxHeight, elem[0].querySelectorAll('.section-container.auto > section > .content').length)
            };
            ctrl.tabChange = function () {
                elem.find('section').removeClass('active');
            }
        }
    };
}])
.directive('tab', [function () {
    return {
        restrict: 'E',
        require: '^tabContainer',
        replace: true,
        transclude: true,
        template: "<section>" +
                    "<p class='title' data-section-title><a href>{{ title }}</a></p>" +
                    "<div class='content' data-section-content><div ng-transclude></div></div>" +
                "</section>",
        scope: { title: '@' },
        link: function (scope, elem, attrs, ctrl) {
            var $title = angular.element(elem[0].querySelector(".title"));
            $title.on('click', function () {
                ctrl.tabChange();
                elem.addClass('active');
            });
            scope.$watch('title', function () {
                ctrl.titleChange();
            });
        }
    };
}])
;