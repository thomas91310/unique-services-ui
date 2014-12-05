function pixelController($scope, $http, $modal) {

    console.log($http);

    $scope.frequences = ['hourly', 'daily', 'total'];

    $scope.$watch('totalOrDaily', function(totalOrDaily) {
        if ($scope.totalOrDaily == "daily" || $scope.totalOrDaily == "Total")
            $("#datePicker").css('display', '');
        else 
            $("#datePicker").css('display', 'none');
    });

    $scope.apiCall = function(options) {
        var url = ['https://t1.mediamath.com/uniques/v1', 'pixels', options.id, 'stats', options.frequence].join('/');

        if (options.fromDate != undefined || options.untilDate != undefined)
            url = url + "?start_date=" + options.fromDate + "&end_date=" + options.untilDate;
        $http.get(url).
            success(function(data, status, headers, config) {
                console.log('came back with data :', data);
                $scope.updateChart(data, options);
            }).
            error(function(data, status, headers, config) {
                console.log("error for the moment.");
        });
    }

    $scope.getPixels = function() {
        var url = ['https://t1.mediamath.com/uniques/v1', 'pixels', $scope.valueId, 'stats', $scope.frequence].join('/');
        var fromDate = $scope.fromDate;
        var untilDate = $scope.untilDate;

        if ($scope.fromDate != undefined || $scope.untilDate != undefined) {
            fromDate = moment(fromDate);
            untilDate = moment(untilDate);
            var monthsFromDate = fromDate.months() + 1;
            var monthsUntilDate = untilDate.months() + 1;
            fromDate = fromDate.year() + '-' + monthsFromDate + '-' + fromDate.date();
            untilDate = untilDate.year() + '-' + monthsUntilDate + '-' + untilDate.date();
            url = url + "?start_date=" + fromDate + "&end_date=" + untilDate;
        }   

        //change using get jQueryx
    }

    $scope.updateChart = function(data, options){
        console.log("in update chart first view : ", options);
        $scope.$broadcast('updateSeries', { data: data, options: options });
    }
}