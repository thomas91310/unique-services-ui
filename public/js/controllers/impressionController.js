function impressionController($scope, filterFilter, $http, $modal, $location) {

	$scope.frequences = ['hourly', 'daily', 'total'];

    $scope.$watch('totalOrDaily', function(totalOrDaily) {
        if ($scope.totalOrDaily == "daily" || $scope.totalOrDaily == "Total")
            $("#datePicker").css('display', '');
        else 
            $("#datePicker").css('display', 'none');
    });

    $scope.updateChart = function(data, options){
        $scope.$broadcast('updateSeries', { data: data, options: options });
    }

  	$scope.getImpressions = function() { 
    	var options = {};
    	options.fromDate = $scope.fromDate;
        options.untilDate = $scope.untilDate;
        // if (options.fromDate === undefined || options.untilDate === undefined)
        //     options.defaultDate = true;
        // else
        //     options.defaultDate = false;
        options.organizationId = $scope.organizationId;
        options.strategyId = $scope.strategyId;
        if (options.exchangeId === undefined) 
        	options.exchangeId = '*';
        else
        	options.exchangeId = $scope.exchangeId;
        options.frequence = $scope.totalOrDaily;
        UniqueServicesClient.getImpressions(options, function(data) {
        	console.log("come back with data : ", data);
            $scope.updateChart(data, options);
        });
    }

}