var uniqueservices = angular.module('uniqueservices', ['mgcrea.ngStrap', 'ngAnimate', 'ui', 'highcharts-ng']);

uniqueservices.directive('ngBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            scope.$apply(attrs.ngBlur);
        });
    }
});

uniqueservices.controller('chartController', chartController);
uniqueservices.controller('pixelController', ['$scope', 'filterFilter', '$http', '$modal', '$location', pixelController]);
uniqueservices.controller('segmentController', ['$scope', 'filterFilter', '$http', '$modal', '$location', segmentController]);
uniqueservices.controller('impressionController', ['$scope', 'filterFilter', '$http', '$modal', '$location', impressionController]);