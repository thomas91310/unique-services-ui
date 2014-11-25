var uniqueservices = angular.module('uniqueservices', ['mgcrea.ngStrap', 'ngAnimate', 'ui', 'highcharts-ng']);

uniqueservices.directive('ngBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            scope.$apply(attrs.ngBlur);
        });
    }
});

//uniqueservices.controller('dashboardController', dashboardController);
uniqueservices.controller('chartController', chartController);
uniqueservices.controller('UniqueServicesCtrl', ['$scope', 'filterFilter', '$http', '$modal', '$location', function($scope, filterFilter, $http, $modal, $location) {

    //MODALS
    var modalSignup = $modal({scope: $scope, template: 'modalSignup.html', animation: "am-fade-and-scale", show: false});
    var modalResult = $modal({scope: $scope, template: 'modalResult.html', animation: "am-flip-x", show: false});

    $scope.location = $location;

    $scope.frequences = ["hourly", "daily", "total"];

    $("#datePicker").css('display', 'none'); //basic config 

    //$("#containerChart").css('display', 'none');

    $scope.$watch('totalOrDaily', function(totalOrDaily) {
        if ($scope.totalOrDaily == "daily" || $scope.totalOrDaily == "Total")
            $("#datePicker").css('display', '');
        else 
            $("#datePicker").css('display', 'none');

    });

    $scope.$watch('location.path()',function(path) {  //depending on the location, display the proper todos
        $("#" + $scope.typeSearch).removeClass('active')
        $scope.typeSearch = (path == '/pixels') ? 'pixel' :
                              (path == '/segments') ? 'segment' :
                              (path == '/impressions') ? 'impression' :
                              (path == '/overlap') ? 'overlap' :
                              'pixel';
        $("#" + $scope.typeSearch).addClass('active');
        if ($scope.typeSearch == "segment")
            $scope.frequences = ["daily", "total"];
        else
             $scope.frequences = ["hourly", "daily", "total"];
    },true); 

    $scope.verifySubmission = function() {
        var options = {};
        options.fromDate = $scope.fromDate;
        options.untilDate = $scope.untilDate;
        options.id = $scope.valueId;
        options.frequence = $scope.totalOrDaily;
        switch ($scope.typeSearch) {
        case "pixel":
            $scope.getPixels(options);
            break;
        case "segment":
            $scope.getSegments(options);
            break;
        case "impression":
            $scope.getImpressions(options);
            break;
        }
    }

    $scope.getPixels = function(options) { 
        console.log("options : ", options);
        UniqueServicesClient.getPixels(options, function(data) {
            console.log('came back with data :', data);
            $scope.updateChart(data, options);
        });
    }

    $scope.updateChart = function(data, options){
        $scope.$broadcast('updateSeries', { data: data, options: options });
    }

    $scope.getSegments = function(options) { 
        console.log("options : ", options);
        UniqueServicesClient.getSegments(options, function(data) {
            console.log('came back with data :', data);
        });
    }

    $scope.getImpressions = function(options) { 
        console.log("options : ", options);
        UniqueServicesClient.getImpressions(options, function(data) {
            console.log('came back with data :', data);
        });
    }

function setModalAndDisplay(scope, title, description, nameModal) {
    scope.titleModal = title;
    scope.descriptionModal = description;
    scope.showModal(nameModal);
}

}]);