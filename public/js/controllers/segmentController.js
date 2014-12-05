function segmentController($scope, filterFilter, $http, $modal, $location) {

	$scope.frequences = ['daily', 'total'];

    $scope.updateChart = function(data, options){
        $scope.$broadcast('updateSeries', { data: data, options: options });
    }

    $scope.getSegments = function() { 
    	var options = {};
        options.id = $scope.valueId;
        options.segmentName = $scope.segmentName;
        options.frequence = $scope.totalOrDaily;
        UniqueServicesClient.getSegments(options, function(data) {
            $scope.updateChart(data, options);
        });
    }
}