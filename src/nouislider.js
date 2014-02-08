'use strict';
angular.module('nouislider', []);
'use strict';
angular.module('nouislider').directive('slider', function () {
  return {
    restrict: 'A',
    scope: {
      start: '@',
      step: '@',
      end: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var fromParsed, parsedValue, slider, toParsed;
      slider = $(element);
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        slider.noUiSlider({
          range: [
            scope.start,
            scope.end
          ],
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          connect: true
        }).change(function (ev) {
          var from, to, _ref;
          _ref = slider.val(), from = _ref[0], to = _ref[1];
          fromParsed = parseInt(from, 10);
          toParsed = parseInt(from, 10);
          return scope.$apply(function () {
            scope.ngFrom = fromParsed;
            return scope.ngTo = toParsed;
          });
        });
        scope.$watch('ngFrom', function (newVal, oldVal) {
          if (newVal !== fromParsed) {
            return slider.val([
              newVal,
              null
            ]);
          }
        });
        return scope.$watch('ngTo', function (newVal, oldVal) {
          if (newVal !== toParsed) {
            return slider.val([
              null,
              newVal
            ]);
          }
        });
      } else {
        parsedValue = null;
        slider.noUiSlider({
          range: [
            scope.start,
            scope.end
          ],
          start: scope.ngModel || scope.start,
          step: scope.step,
          handles: 1
        }).change(function (ev) {
          parsedValue = slider.val();
          return scope.$apply(function () {
            return scope.ngModel = parseInt(parsedValue, 10);
          });
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider.val(newVal);
          }
        });
      }
    }
  };
});